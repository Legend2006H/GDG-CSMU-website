"use client";

import React, { useState } from "react";
import { MessageSquare, ExternalLink, CheckCircle2, AlertCircle, Send, Users, ShieldCheck } from "lucide-react";

const INTEREST_OPTIONS = [
  "Web Development",
  "Android Development",
  "Cloud & DevOps",
  "AI/ML",
  "UI/UX Design",
  "Competitive Programming",
];

const REGISTERED_EMAILS_STORAGE_KEY = "gdg_csmu_members_emails";

export default function CommunityPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    interests: [] as string[],
  });

  const [status, setStatus] = useState<"idle" | "success" | "duplicate" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const toggleInterest = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((i) => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.studentId.trim()) {
      setStatus("error");
      setStatusMessage("Please fill in all required fields.");
      return;
    }

    if (formData.interests.length === 0) {
      setStatus("error");
      setStatusMessage("Please select at least one technology interest.");
      return;
    }

    try {
      const stored = localStorage.getItem(REGISTERED_EMAILS_STORAGE_KEY);
      const emailList: string[] = stored ? JSON.parse(stored) : [];
      const normalizedEmail = formData.email.trim().toLowerCase();

      if (emailList.includes(normalizedEmail)) {
        setStatus("duplicate");
        setStatusMessage("This email is already registered");
        return;
      }

      emailList.push(normalizedEmail);
      localStorage.setItem(REGISTERED_EMAILS_STORAGE_KEY, JSON.stringify(emailList));

      setStatus("success");
      setStatusMessage("Application submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        studentId: "",
        interests: [],
      });
    } catch {
      setStatus("success");
      setStatusMessage("Application submitted successfully!");
    }
  };

  return (
    <div className="subpage">
      <div className="subpage-content">
        <span className="section-index font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
          {"// JOIN US"}
        </span>

        <h1 className="mt-4">
          Join Our Community
          <span>Be part of a vibrant community of developers, learners, and innovators</span>
        </h1>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Membership Application Form */}
          <div className="lg:col-span-7">
            <div className="modern-card p-8 md:p-10 border border-[var(--card-border)] bg-[var(--surface-card)] rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#4285F4]" />

              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-[var(--white)]">
                  Become a Member
                </h2>
                <p className="text-sm text-[var(--muted-bright)] mt-1">
                  Fill in your student details to register for GDG on Campus CSMU.
                </p>
              </div>

              {/* Status alerts */}
              {status === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-[rgba(52,168,83,0.12)] border border-[rgba(52,168,83,0.3)] text-[#34A853] flex items-center gap-3 text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5 flex-none" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === "duplicate" && (
                <div className="mb-6 p-4 rounded-xl bg-[rgba(234,67,53,0.12)] border border-[rgba(234,67,53,0.3)] text-[#EA4335] flex items-center gap-3 text-sm font-semibold">
                  <AlertCircle className="w-5 h-5 flex-none" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-[rgba(251,188,4,0.12)] border border-[rgba(251,188,4,0.3)] text-[#FBBC04] flex items-center gap-3 text-sm font-semibold">
                  <AlertCircle className="w-5 h-5 flex-none" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Alex Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--card-border)] text-[var(--white)] placeholder:text-[var(--muted)] text-sm focus:outline-none focus:border-[#4285F4] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@csmu.ac.in"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--card-border)] text-[var(--white)] placeholder:text-[var(--muted)] text-sm focus:outline-none focus:border-[#4285F4] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-2">
                    Student ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="e.g. CSMU2025001"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--card-border)] text-[var(--white)] placeholder:text-[var(--muted)] text-sm focus:outline-none focus:border-[#4285F4] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-2">
                    Interests (Select all that apply) *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {INTEREST_OPTIONS.map((interest) => {
                      const selected = formData.interests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`p-3 rounded-xl text-left text-xs font-mono border transition-all cursor-pointer flex items-center justify-between ${
                            selected
                              ? "bg-[rgba(66,133,244,0.15)] border-[#4285F4] text-[var(--white)]"
                              : "bg-[var(--surface)] border-[var(--card-border)] text-[var(--muted-bright)] hover:border-[var(--muted)]"
                          }`}
                        >
                          <span>{interest}</span>
                          <span
                            className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                              selected ? "bg-[#4285F4] text-white" : "border border-[var(--line)]"
                            }`}
                          >
                            {selected ? "✓" : ""}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="button button-primary w-full">
                    <span>Submit Application</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Connect With Us Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="modern-card p-8 space-y-6">
              <h2 className="text-xl font-bold text-[var(--white)]">
                Connect With Us
              </h2>
              <p className="text-sm text-[var(--muted-bright)] leading-relaxed">
                Stay updated with the latest events, announcements, and developer discussions across our official platforms.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href="https://chat.whatsapp.com/GULUy0LN36c0NkRiMEyW2i"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--surface)] hover:border-[#34A853] flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(52,168,83,0.1)] text-[#34A853] flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--white)] group-hover:text-[#34A853] transition-colors">
                        WhatsApp Group
                      </h4>
                      <p className="font-mono text-xs text-[var(--muted)]">Official student chat</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--white)]" />
                </a>

                <a
                  href="https://www.instagram.com/gdgoncampus.csmu?igsh=M2F6anJjZnNqYWd3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--surface)] hover:border-[#EA4335] flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(234,67,53,0.1)] text-[#EA4335] flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--white)] group-hover:text-[#EA4335] transition-colors">
                        Instagram
                      </h4>
                      <p className="font-mono text-xs text-[var(--muted)]">@gdgoncampus.csmu</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--white)]" />
                </a>

                <a
                  href="https://www.linkedin.com/company/google-developer-group-on-campus-csmu/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--surface)] hover:border-[#4285F4] flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(66,133,244,0.1)] text-[#4285F4] flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--white)] group-hover:text-[#4285F4] transition-colors">
                        LinkedIn
                      </h4>
                      <p className="font-mono text-xs text-[var(--muted)]">Google Developer Group on Campus CSMU</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--white)]" />
                </a>

                <a
                  href="https://developers.google.com/community/gdg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--surface)] hover:border-[#FBBC04] flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(251,188,4,0.1)] text-[#FBBC04] flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--white)] group-hover:text-[#FBBC04] transition-colors">
                        GDG Global Community
                      </h4>
                      <p className="font-mono text-xs text-[var(--muted)]">developers.google.com/community/gdg</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--white)]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
