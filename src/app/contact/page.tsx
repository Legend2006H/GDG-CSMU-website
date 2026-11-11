"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="subpage">
      <div className="subpage-content">
        <span className="section-index font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
          {"// REACH OUT"}
        </span>

        <h1 className="mt-4">
          Get In Touch
          <span>Have questions? We&apos;d love to hear from you!</span>
        </h1>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="modern-card p-8 space-y-6">
              <h2 className="text-xl font-bold text-[var(--white)]">
                Contact Information
              </h2>
              <p className="text-sm text-[var(--muted-bright)] leading-relaxed">
                Reach out to the GDG on Campus CSMU core team directly or visit our campus office.
              </p>

              <div className="space-y-5 pt-2">
                <a
                  href="mailto:gdgoc.csmu@gmail.com"
                  className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--surface)] hover:border-[#EA4335] flex items-start gap-4 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[rgba(234,67,53,0.1)] text-[#EA4335] flex items-center justify-center flex-none">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider block">
                      Email
                    </span>
                    <span className="text-sm font-semibold text-[var(--white)] group-hover:text-[#EA4335] transition-colors break-all">
                      gdgoc.csmu@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="tel:+919867789541"
                  className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--surface)] hover:border-[#34A853] flex items-start gap-4 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[rgba(52,168,83,0.1)] text-[#34A853] flex items-center justify-center flex-none">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider block">
                      Phone
                    </span>
                    <span className="text-sm font-semibold text-[var(--white)] group-hover:text-[#34A853] transition-colors">
                      +91 98677 89541
                    </span>
                  </div>
                </a>

                <div className="p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--surface)] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(66,133,244,0.1)] text-[#4285F4] flex items-center justify-center flex-none">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider block">
                      Location
                    </span>
                    <span className="text-sm font-semibold text-[var(--white)] leading-relaxed block">
                      CSMU Campus, Panvel, Navi Mumbai, Maharashtra 410221
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="modern-card p-4 overflow-hidden rounded-3xl">
              <div className="relative w-full h-[260px] rounded-2xl overflow-hidden border border-[var(--line)]">
                <iframe
                  title="CSMU Campus Panvel Google Map"
                  src="https://www.google.com/maps?q=CSMU%20Campus%20Panvel&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="modern-card p-8 md:p-10 border border-[var(--card-border)] bg-[var(--surface-card)] rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#34A853]" />

              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-[var(--white)]">
                  Send us a message
                </h2>
                <p className="text-sm text-[var(--muted-bright)] mt-1">
                  Have an inquiry or collaboration idea? Leave us a message below.
                </p>
              </div>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-[rgba(52,168,83,0.12)] border border-[rgba(52,168,83,0.3)] text-[#34A853] flex items-center gap-3 text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5 flex-none" />
                  <span>Thank you! Your message has been received.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
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
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--card-border)] text-[var(--white)] placeholder:text-[var(--muted)] text-sm focus:outline-none focus:border-[#4285F4] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What is this regarding?"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--card-border)] text-[var(--white)] placeholder:text-[var(--muted)] text-sm focus:outline-none focus:border-[#4285F4] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--card-border)] text-[var(--white)] placeholder:text-[var(--muted)] text-sm focus:outline-none focus:border-[#4285F4] transition-colors resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="button button-primary w-full">
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
