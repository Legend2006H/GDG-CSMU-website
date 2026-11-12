"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JoinBand } from "./JoinBand";

// ============================================================================
// LIVE IST CLOCK (Panvel, India · IST, ticking every second, tabular numbers)
// ============================================================================
function LiveClock() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        const formatted = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setTimeStr(formatted);
      } catch {
        setTimeStr(now.toTimeString().split(" ")[0]);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="tabular-nums font-mono text-xs sm:text-[13px] text-zinc-400">
      Panvel, India · {timeStr ? `${timeStr} IST` : "IST"}
    </span>
  );
}

// ============================================================================
// YONSEI-STYLE CLOSING BAND + FOOTER
// ============================================================================
export function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    if (!footer) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(footer, { opacity: 1 });
      if (wordmarkRef.current) gsap.set(wordmarkRef.current, { opacity: 1, y: 0 });
      return;
    }

    // Footer entrance: fade in once on scroll, 0.8s
    gsap.fromTo(
      footer,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 85%",
          once: true,
        },
      }
    );

    // Wordmark entrance: fade + y 24 to 0
    if (wordmarkRef.current) {
      gsap.fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <div className="w-full bg-[#121212] text-white">
      {/* 1. THE BAND: Yonsei-Style Closing Join Band with interactive dot lattice & chevrons */}
      <JoinBand />

      {/* 2. FOOTER: after a wide blank gap, same near-black background */}
      <footer
        ref={footerRef}
        className="w-full bg-[#121212] pt-20 sm:pt-28 pb-12 px-6"
        aria-label="Site Footer"
      >
        <div className="max-w-[1100px] mx-auto">
          {/* 4 COLUMNS: Brand + Blurb, EXPLORE, CONNECT, SITE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 pb-16">
            {/* Column 1: Left Brand + Short Blurb (CSMU real line only) */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">
                  GDG on Campus CSMU
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-[#A0A0A0] max-w-xs font-normal">
                Chhatrapati Shivaji Maharaj University&apos;s student developer community in Panvel, Navi Mumbai.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
                <span className="w-2 h-2 rounded-full bg-[#FBBC04]" />
                <span className="w-2 h-2 rounded-full bg-[#34A853]" />
              </div>
            </div>

            {/* Column 2: EXPLORE */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#888888]">
                EXPLORE
              </h3>
              <nav className="flex flex-col gap-4 text-[16px] text-white">
                <Link
                  href="/events"
                  className="hover:underline underline-offset-4 decoration-white/70 transition-all w-fit"
                >
                  Sessions
                </Link>
                <Link
                  href="/projects"
                  className="hover:underline underline-offset-4 decoration-white/70 transition-all w-fit"
                >
                  Projects
                </Link>
                <Link
                  href="/events"
                  className="hover:underline underline-offset-4 decoration-white/70 transition-all w-fit"
                >
                  Calendar
                </Link>
                <Link
                  href="/team"
                  className="hover:underline underline-offset-4 decoration-white/70 transition-all w-fit"
                >
                  Members
                </Link>
              </nav>
            </div>

            {/* Column 3: CONNECT */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#888888]">
                CONNECT
              </h3>
              <nav className="flex flex-col gap-4 text-[16px] text-white">
                <a
                  href="https://www.instagram.com/gdgoncampus.csmu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 decoration-white/70 transition-all inline-flex items-center gap-1.5 w-fit"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 stroke-[2.2]" />
                </a>
                <a
                  href="https://www.linkedin.com/company/google-developer-group-on-campus-csmu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 decoration-white/70 transition-all inline-flex items-center gap-1.5 w-fit"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 stroke-[2.2]" />
                </a>
                <a
                  href="mailto:gdgoc.csmu@gmail.com"
                  className="hover:underline underline-offset-4 decoration-white/70 transition-all w-fit"
                >
                  Email
                </a>
                <a
                  href="https://developers.google.com/community/gdg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 decoration-white/70 transition-all inline-flex items-center gap-1.5 w-fit"
                >
                  <span>Official GDG chapter</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 stroke-[2.2]" />
                </a>
              </nav>
            </div>

            {/* Column 4: SITE */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#888888]">
                SITE
              </h3>
              <nav className="flex flex-col gap-4 text-[16px] text-white">
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 decoration-white/70 transition-all inline-flex items-center gap-1.5 w-fit"
                >
                  <span>Privacy Policy</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 stroke-[2.2]" />
                </a>
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 decoration-white/70 transition-all inline-flex items-center gap-1.5 w-fit"
                >
                  <span>Terms of Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 stroke-[2.2]" />
                </a>
                <a
                  href="https://github.com/Legend2006H/GDG-CSMU-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4 decoration-white/70 transition-all inline-flex items-center gap-1.5 w-fit"
                >
                  <span>Source code</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 stroke-[2.2]" />
                </a>
              </nav>
            </div>
          </div>

          {/* GIANT WHITE WORDMARK (140-150px tall on desktop, spanning the 1100px column) */}
          <div
            ref={wordmarkRef}
            className="w-full text-center select-none overflow-hidden pt-6 pb-12 sm:pb-16"
          >
            <span className="block font-black tracking-tighter text-white leading-none text-[clamp(48px,13.2vw,148px)] uppercase">
              GDG CSMU
            </span>
          </div>

          {/* THIN DIVIDER */}
          <div className="w-full h-px bg-white/10 mb-8" />

          {/* BOTTOM BAR: Copyright & Live Clock */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <div>
              <span>© 2026 GDG on Campus CSMU. All rights reserved.</span>
            </div>
            <div>
              <LiveClock />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
