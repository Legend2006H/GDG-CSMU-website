"use client";

import React from "react";
import Link from "next/link";
import { Mark } from "@/components/gdg/mark";
import { ArrowRight, Compass, Target, BookOpen, Users, Layers } from "lucide-react";

export default function AboutPage() {
  const journey = [
    { year: "2024", milestone: "GDG on Campus CSMU Founded", tag: "Foundation" },
    { year: "2024", milestone: "Info Session & Blockchain Workshop", tag: "Workshop" },
    { year: "2025", milestone: "Speaker Session & Study Jams Launched", tag: "Learning" },
    { year: "2025", milestone: "Bootcamps, Hackathon & Community Growth", tag: "Innovation" },
    { year: "2026", milestone: "DevFest CSMU - Our Flagship Event", tag: "Flagship" },
  ];

  return (
    <div className="subpage">
      <div className="subpage-content">
        <span className="section-index font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
          {"// ABOUT US"}
        </span>

        <h1 className="mt-4">
          About GDG on Campus CSMU
          <span>A vibrant community of passionate developers united by technology and innovation</span>
        </h1>

        {/* What is GDG Section */}
        <section className="mt-16 modern-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]" />

          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <Mark className="w-8 h-6" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--white)]">
                What is Google Developers Group?
              </h2>
            </div>

            <p className="text-[var(--muted-bright)] text-base md:text-lg leading-relaxed">
              Google Developers Groups (GDGs) are community-led, not-for-profit developer communities that bring together developers who are passionate about Google&apos;s developer technologies. From beginners to experts, GDG welcomes everyone interested in technology.
            </p>

            <p className="text-[var(--muted-bright)] text-base md:text-lg leading-relaxed">
              GDG on Campus is a university-based extension of the GDG program, designed specifically for students who want to learn, share knowledge, and collaborate on projects using Google technologies.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="modern-card p-8 md:p-10 space-y-5 border-l-4 border-l-[#4285F4]">
            <div className="w-12 h-12 rounded-2xl bg-[rgba(66,133,244,0.1)] flex items-center justify-center text-[#4285F4]">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--white)]">Our Mission</h2>
            <p className="text-[var(--muted-bright)] text-base leading-relaxed">
              To empower CSMU students with cutting-edge developer skills, foster innovation, and create a supportive community where everyone can learn, build, and grow together using Google&apos;s technologies.
            </p>
          </div>

          <div className="modern-card p-8 md:p-10 space-y-5 border-l-4 border-l-[#34A853]">
            <div className="w-12 h-12 rounded-2xl bg-[rgba(52,168,83,0.1)] flex items-center justify-center text-[#34A853]">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--white)]">Our Vision</h2>
            <p className="text-[var(--muted-bright)] text-base leading-relaxed">
              To be the leading student developer community in CSMU, inspiring the next generation of tech innovators and creating impactful solutions that make a difference in our university and beyond.
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="mt-20">
          <div className="mb-10">
            <span className="section-index font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              {"// ACTIVITIES"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 text-[var(--white)]">
              What We Do
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="modern-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(66,133,244,0.1)] text-[#4285F4] flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--white)]">Workshops &amp; Training</h3>
              <p className="text-[var(--muted-bright)] text-sm leading-relaxed">
                Hands-on workshops covering web, mobile, cloud, and AI technologies.
              </p>
            </div>

            <div className="modern-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(234,67,53,0.1)] text-[#EA4335] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--white)]">Community Building</h3>
              <p className="text-[var(--muted-bright)] text-sm leading-relaxed">
                Regular meetups, hackathons, and networking events with industry experts.
              </p>
            </div>

            <div className="modern-card p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(52,168,83,0.1)] text-[#34A853] flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--white)]">Project Development</h3>
              <p className="text-[var(--muted-bright)] text-sm leading-relaxed">
                Collaborative projects and mentorship programs for real-world experience.
              </p>
            </div>
          </div>
        </section>

        {/* Our Journey Timeline */}
        <section className="mt-24">
          <div className="mb-12">
            <span className="section-index font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              {"// MILESTONES"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 text-[var(--white)]">
              Our Journey
            </h2>
          </div>

          <div className="relative border-l border-[var(--line)] ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
            {journey.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Node dot */}
                <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-5 h-5 rounded-full border-4 border-[var(--bg)] bg-[#4285F4] group-hover:scale-125 transition-transform" />

                <div className="modern-card p-6 md:p-8 space-y-2 max-w-2xl">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-sm font-bold text-[#4285F4]">
                      {item.year}
                    </span>
                    <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--surface-highlight)] text-[var(--muted-bright)]">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[var(--white)]">
                    {item.milestone}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 modern-card p-10 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--white)]">
            Ready to shape the future with us?
          </h2>
          <p className="text-[var(--muted-bright)] text-sm max-w-lg mx-auto">
            Become a part of the GDG CSMU community and start your developer journey with Google technologies today.
          </p>
          <div className="pt-2">
            <Link href="/community" className="button button-primary">
              <span>Join Community</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
