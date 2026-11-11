"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import { MarqueeStrip } from "@/components/animation/MarqueeStrip";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer border-t border-[var(--line)] bg-[var(--surface)] text-[var(--muted)]">
      {/* 2026 Seamless Footer Marquee */}
      <MarqueeStrip
        items={[
          "CONNECT • LEARN • GROW",
          "CSMU STUDENT DEVELOPERS",
          "GOOGLE DEVELOPER GROUPS ON CAMPUS",
          "BUILD FOR IMPACT",
          "JOIN OUR COMMUNITY",
        ]}
        speed={32}
        direction="right"
      />

      <div className="footer-top max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Col 1: Brand & intro */}
        <div className="footer-intro md:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2 text-white font-bold text-base mb-4">
            <div className="relative w-7 h-7 flex-none">
              <Image
                src="/images/gdg-logo.png"
                alt="GDG CSMU Logo"
                width={28}
                height={28}
                className="object-contain"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <span className="text-[var(--white)]">GDG CSMU</span>
          </Link>
          <p className="text-xs leading-relaxed text-[var(--muted)] mt-2">
            Official Google Developers Group on Campus at CSMU. Building a community of passionate developers.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FBBC04]" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#34A853]" />
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="footer-column flex flex-col gap-2.5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--white)] mb-1">Navigation</h3>
          <Link href="/" className="text-xs hover:text-[var(--white)] transition-colors">&lt; Home &gt;</Link>
          <Link href="/about" className="text-xs hover:text-[var(--white)] transition-colors">&lt; About &gt;</Link>
          <Link href="/events" className="text-xs hover:text-[var(--white)] transition-colors">&lt; Events &gt;</Link>
          <Link href="/team" className="text-xs hover:text-[var(--white)] transition-colors">&lt; Team &gt;</Link>
          <Link href="/technologies" className="text-xs hover:text-[var(--white)] transition-colors">&lt; Technologies &gt;</Link>
          <Link href="/community" className="text-xs hover:text-[var(--white)] transition-colors">&lt; Community &gt;</Link>
          <Link href="/contact" className="text-xs hover:text-[var(--white)] transition-colors">&lt; Contact &gt;</Link>
        </div>

        {/* Col 3: Community & Portals */}
        <div className="footer-column flex flex-col gap-2.5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--white)] mb-1">Community</h3>
          <a
            href="https://chat.whatsapp.com/GULUy0LN36c0NkRiMEyW2i"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:text-[var(--white)] flex items-center gap-1.5 transition-colors"
          >
            <span>WhatsApp Community</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.instagram.com/gdgoncampus.csmu?igsh=M2F6anJjZnNqYWd3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:text-[var(--white)] flex items-center gap-1.5 transition-colors"
          >
            <span>Instagram (@gdgoncampus.csmu)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.linkedin.com/company/google-developer-group-on-campus-csmu/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:text-[var(--white)] flex items-center gap-1.5 transition-colors"
          >
            <span>LinkedIn Chapter</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://developers.google.com/community/gdg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:text-[var(--white)] flex items-center gap-1.5 transition-colors"
          >
            <span>Google Developer Groups</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Col 4: Contact info */}
        <div className="footer-column flex flex-col gap-2.5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--white)] mb-1">Contact</h3>
          <a
            href="mailto:gdgoc.csmu@gmail.com"
            className="text-xs hover:text-[var(--white)] flex items-start gap-2 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 mt-0.5 text-[#EA4335] flex-none" />
            <span className="break-all">gdgoc.csmu@gmail.com</span>
          </a>
          <a
            href="tel:+919867789541"
            className="text-xs hover:text-[var(--white)] flex items-center gap-2 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#34A853] flex-none" />
            <span>+91 98677 89541</span>
          </a>
          <div className="text-xs flex items-start gap-2 leading-relaxed">
            <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#4285F4] flex-none" />
            <span>CSMU Campus, Panvel, Navi Mumbai, Maharashtra 410221</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom max-w-[1200px] mx-auto px-6 py-6 border-t border-[var(--line)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div>
          <span>© {currentYear} GDG on Campus CSMU. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-2 text-[var(--muted)]">
          <span>Built &amp; Maintained by GDG CSMU Technical Team</span>
          <i className="w-1.5 h-1.5 rounded-full bg-[#4285F4] inline-block" />
        </div>
      </div>
    </footer>
  );
}

