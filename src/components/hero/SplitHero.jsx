"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Calendar } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DotGrid } from "./DotGrid";
import { DottedChevron } from "./DottedChevron";
import { Magnetic } from "@/components/animation/Magnetic";
import {
  HERO_SCROLL_HEIGHT,
  SCRUB,
  TITLE_TRAVEL,
  CHEVRON_TRAVEL,
  META_FADE_END,
  HERO_SCALE_TO,
} from "./heroConfig";

export function SplitHero() {
  const heroRef = useRef(null);
  const stickyRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftChevronRef = useRef(null);
  const rightChevronRef = useRef(null);
  const eyebrowRef = useRef(null);
  const metaRef = useRef(null);
  const hintRef = useRef(null);

  // Mobile-specific refs for mobile scroll animation
  const mobileStickyRef = useRef(null);
  const mobileLeftRef = useRef(null);
  const mobileRightRef = useRef(null);
  const mobileLeftChevronRef = useRef(null);
  const mobileRightChevronRef = useRef(null);
  const mobileMetaRef = useRef(null);
  const mobileHintRef = useRef(null);

  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Initial SplitText reveal for the headline on page entrance (both desktop & mobile)
    document.fonts.ready.then(() => {
      const titleTargets = [
        leftRef.current,
        rightRef.current,
        mobileLeftRef.current,
        mobileRightRef.current,
      ].filter(Boolean);

      if (titleTargets.length > 0) {
        gsap.fromTo(
          titleTargets,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
          }
        );
      }
    });

    const mm = gsap.matchMedia();

    // 1. Desktop matchMedia (>= 768px): Pinned 160vh scroll-to-open split hero
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        setIsAnimated(true);

        const hero = heroRef.current;
        const sticky = stickyRef.current;
        if (!hero || !sticky) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: SCRUB,
            invalidateOnRefresh: true,
          },
        });

        // 1. Hint fades out within the first 10% of the timeline
        if (hintRef.current) {
          tl.to(
            hintRef.current,
            {
              opacity: 0,
              y: 8,
              duration: 0.1,
              ease: "power1.out",
            },
            0
          );
        }

        // 2. Chevrons travel further (±180%) and start at position 0
        if (leftChevronRef.current) {
          tl.to(
            leftChevronRef.current,
            {
              xPercent: -CHEVRON_TRAVEL,
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            0
          );
        }

        if (rightChevronRef.current) {
          tl.to(
            rightChevronRef.current,
            {
              xPercent: CHEVRON_TRAVEL,
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            0
          );
        }

        // 3. Title halves split (±120%)
        if (leftRef.current) {
          tl.to(
            leftRef.current,
            {
              xPercent: -TITLE_TRAVEL,
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            0
          );
        }

        if (rightRef.current) {
          tl.to(
            rightRef.current,
            {
              xPercent: TITLE_TRAVEL,
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            0
          );
        }

        // 4. Meta group (eyebrow + subtext + buttons + stats + hint) fades out and moves up by META_FADE_END (0.35)
        const metaElements = [eyebrowRef.current, metaRef.current, hintRef.current].filter(Boolean);
        if (metaElements.length > 0) {
          tl.to(
            metaElements,
            {
              opacity: 0,
              y: -24,
              duration: META_FADE_END,
              ease: "power2.out",
              onComplete: () => {
                metaElements.forEach((el) => {
                  if (el) el.style.visibility = "hidden";
                });
              },
              onReverseComplete: () => {
                metaElements.forEach((el) => {
                  if (el) el.style.visibility = "visible";
                });
              },
            },
            0
          );
        }

        // 5. Inner hero container scales slightly down over the full timeline
        tl.to(
          sticky,
          {
            scale: HERO_SCALE_TO,
            duration: 1,
            ease: "none",
          },
          0
        );
      }
    );

    // 2. Mobile matchMedia (< 768px): Responsive split scroll animation when scrolling below
    mm.add(
      "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      () => {
        const hero = heroRef.current;
        const mobileSticky = mobileStickyRef.current;
        if (!hero || !mobileSticky) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // 1. Scroll cue fades out fast in first 10% of scroll
        if (mobileHintRef.current) {
          tl.to(
            mobileHintRef.current,
            { opacity: 0, y: 10, duration: 0.1, ease: "power1.out" },
            0
          );
        }

        // 2. Chevrons travel outward
        if (mobileLeftChevronRef.current) {
          tl.to(
            mobileLeftChevronRef.current,
            { xPercent: -150, opacity: 0, duration: 1, ease: "power2.inOut" },
            0
          );
        }
        if (mobileRightChevronRef.current) {
          tl.to(
            mobileRightChevronRef.current,
            { xPercent: 150, opacity: 0, duration: 1, ease: "power2.inOut" },
            0
          );
        }

        // 3. Title halves split outward
        if (mobileLeftRef.current) {
          tl.to(
            mobileLeftRef.current,
            { xPercent: -100, opacity: 0, duration: 1, ease: "power2.inOut" },
            0
          );
        }
        if (mobileRightRef.current) {
          tl.to(
            mobileRightRef.current,
            { xPercent: 100, opacity: 0, duration: 1, ease: "power2.inOut" },
            0
          );
        }

        // 4. Content group (subtext, buttons, stats, next event) fades out and slides up
        if (mobileMetaRef.current) {
          tl.to(
            mobileMetaRef.current,
            { opacity: 0, y: -24, duration: 0.45, ease: "power2.out" },
            0
          );
        }

        // 5. Container subtle scale
        tl.to(
          mobileSticky,
          { scale: 0.96, duration: 1, ease: "none" },
          0
        );
      }
    );

    // Call ScrollTrigger.refresh() after mounting and font load
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
      mm.revert();
      setIsAnimated(false);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-[var(--bg)] h-[135svh] md:h-auto min-h-[100svh]"
      style={{ height: isAnimated ? HERO_SCROLL_HEIGHT : undefined }}
    >
      {/* Background Dot-Grid with Mouse & Touch Glow */}
      <DotGrid />

      {/* Soft Google ambient glows behind content on mobile (step 4) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-10 w-64 h-64 rounded-full bg-[#4285F4] opacity-[0.22] blur-[80px] md:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-[#34A853] opacity-[0.22] blur-[80px] md:hidden"
      />

      {/* =========================================================================
          DESKTOP HERO (>=768px): Pinned 160vh scroll-to-open split hero (untouched)
         ========================================================================= */}
      <div
        ref={stickyRef}
        className={
          isAnimated
            ? "sticky top-0 h-screen overflow-hidden hidden md:flex flex-col justify-between items-center px-4 sm:px-6 py-6 md:py-10 z-10"
            : "relative h-screen overflow-hidden hidden md:flex flex-col justify-between items-center px-4 sm:px-6 py-6 md:py-10 z-10"
        }
      >
        {/* Floating navbar clearance */}
        <div className="w-full h-12 sm:h-16 flex-none" />

        {/* Center Hero Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center my-auto px-2">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="w-full flex flex-col items-center will-change-transform">
            <p className="font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--hero-eyebrow)] font-semibold mb-4 sm:mb-6 max-w-3xl px-2">
              GOOGLE DEVELOPER GROUPS ON CAMPUS · CSMU PANVEL
            </p>
          </div>

          {/* Accessible Title: single h1 for screen readers, split decorative presentation */}
          <h1
            className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 py-2 select-none w-full max-w-full"
            aria-label="< GDG CSMU >"
          >
            {/* LEFT HALF: [ < ] [ GDG ] */}
            <span
              ref={leftRef}
              aria-hidden="true"
              className="flex items-center gap-2 sm:gap-3.5 will-change-transform"
            >
              <span ref={leftChevronRef} className="inline-block will-change-transform">
                <DottedChevron side="left" />
              </span>
              <span className="font-bold tracking-tight text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[var(--hero-title)] whitespace-nowrap">
                GDG
              </span>
            </span>

            {/* RIGHT HALF: [ CSMU ] [ > ] */}
            <span
              ref={rightRef}
              aria-hidden="true"
              className="flex items-center gap-2 sm:gap-3.5 will-change-transform"
            >
              <span className="font-bold tracking-tight text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[var(--hero-title)] whitespace-nowrap">
                CSMU
              </span>
              <span ref={rightChevronRef} className="inline-block will-change-transform">
                <DottedChevron side="right" />
              </span>
            </span>
          </h1>

          {/* Subtext + Buttons + Stats (meta group) */}
          <div
            ref={metaRef}
            className="flex flex-col items-center space-y-6 sm:space-y-8 mt-6 sm:mt-8 max-w-2xl will-change-transform"
          >
            <p className="text-sm sm:text-base md:text-lg text-[var(--muted-bright)] leading-relaxed px-4">
              Join the official Google Developers Group at CSMU. A community of
              passionate developers building the future together.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Magnetic strength={0.3} maxPull={8} padding={16}>
                <Link
                  href="/community"
                  className="button button-primary px-6 py-3 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-lg hover:shadow-[#4285F4]/20 transition-all"
                >
                  <span>Join Community</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <Link
                href="/events"
                className="button px-6 py-3 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-2 border border-[rgba(255,255,255,0.2)] hover:border-[#4285F4] hover:bg-[rgba(66,133,244,0.08)] transition-all text-white bg-[rgba(255,255,255,0.04)]"
              >
                <Calendar className="w-4 h-4 text-[#EA4335]" />
                <span>Upcoming Events</span>
              </Link>
            </div>

            {/* Bottom Stats Strip (Canonical Numbers) */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs sm:text-sm text-[var(--muted-bright)]">
              <span className="flex items-center gap-2">
                <i className="inline-block w-2 h-2 rounded-full bg-[#4285F4]" />
                750+ members
              </span>
              <span className="text-[var(--line)] hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                <i className="inline-block w-2 h-2 rounded-full bg-[#EA4335]" />
                15+ events
              </span>
              <span className="text-[var(--line)] hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                <i className="inline-block w-2 h-2 rounded-full bg-[#FBBC04]" />
                30+ speakers
              </span>
              <span className="text-[var(--line)] hidden sm:inline">•</span>
              <span className="flex items-center gap-2">
                <i className="inline-block w-2 h-2 rounded-full bg-[#34A853]" />
                6 tech tracks
              </span>
            </div>
          </div>
        </div>

        {/* Desktop scroll hint: only rendered when animation is active */}
        {isAnimated ? (
          <div
            ref={hintRef}
            className="relative z-10 pb-2 sm:pb-4 flex flex-col items-center gap-1 select-none pointer-events-none flex-none"
          >
            <span className="font-mono text-[10px] sm:text-[11px] text-[var(--muted)] tracking-[0.25em] uppercase">
              SCROLL TO OPEN
            </span>
            <ChevronDown className="w-4 h-4 text-[var(--muted)] animate-bounce" />
          </div>
        ) : (
          <div className="w-full h-8 flex-none" />
        )}
      </div>

      {/* =========================================================================
          MOBILE HERO (<768px): Exact 100svh fill + smooth split scroll animation
         ========================================================================= */}
      <div
        ref={mobileStickyRef}
        className="md:hidden sticky top-0 z-10 w-full h-[100svh] min-h-[100svh] max-h-[100svh] flex flex-col justify-between items-center px-4 pt-24 pb-4 overflow-hidden max-w-sm sm:max-w-md mx-auto will-change-transform"
      >
        {/* 1. Eyebrow: 11px, tracking 0.18em, no mid-word wrap */}
        <div className="w-full text-center flex-none">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--hero-eyebrow)] font-semibold truncate px-1">
            GOOGLE DEVELOPER GROUPS ON CAMPUS · CSMU PANVEL
          </p>
        </div>

        {/* 2. Title with refs for split scroll animation on mobile */}
        <h1
          className="flex items-center justify-center gap-2 py-1 select-none w-full flex-none overflow-visible"
          aria-label="< GDG CSMU >"
        >
          {/* Left half: chevron + GDG */}
          <span
            ref={mobileLeftRef}
            className="flex items-center gap-1.5 will-change-transform"
          >
            <span ref={mobileLeftChevronRef} className="inline-block will-change-transform">
              <DottedChevron side="left" className="h-[clamp(44px,13vw,64px)] w-auto" />
            </span>
            <span className="font-bold tracking-tight text-[clamp(44px,13vw,64px)] text-[var(--hero-title)] leading-none whitespace-nowrap">
              GDG
            </span>
          </span>

          {/* Right half: CSMU + chevron */}
          <span
            ref={mobileRightRef}
            className="flex items-center gap-1.5 will-change-transform"
          >
            <span className="font-bold tracking-tight text-[clamp(44px,13vw,64px)] text-[var(--hero-title)] leading-none whitespace-nowrap">
              CSMU
            </span>
            <span ref={mobileRightChevronRef} className="inline-block will-change-transform">
              <DottedChevron side="right" className="h-[clamp(44px,13vw,64px)] w-auto" />
            </span>
          </span>
        </h1>

        {/* 3. Content group: subtext + buttons + stats + next event card (fades up on scroll) */}
        <div
          ref={mobileMetaRef}
          className="w-full flex flex-col justify-between items-center gap-3 flex-1 py-1 will-change-transform"
        >
          {/* Subtext: 16px, line-height 1.6, max 34ch, centered */}
          <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[var(--muted-bright)] max-w-[34ch] text-center mx-auto flex-none">
            Join the official Google Developers Group at CSMU. A community of
            passionate developers building the future together.
          </p>

          {/* 4. Stacked CTAs (<480px full-width, 52px tall each, gap 12px) */}
          <div className="w-full flex flex-col gap-3 flex-none">
            <Link
              href="/community"
              className="button button-primary w-full h-[52px] min-h-[52px] rounded-full text-sm font-semibold flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Join Community</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/events"
              className="w-full h-[52px] min-h-[52px] rounded-full text-sm font-semibold flex items-center justify-center gap-2 border border-[var(--line)] bg-[var(--surface-highlight)] text-[var(--white)] hover:border-[#4285F4] transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#EA4335]" />
              <span>Upcoming Events</span>
            </Link>
          </div>

          {/* 5. Stats Row: 3-column grid, full-width, divided, 20px bold white + 11px grey mono */}
          <div className="w-full grid grid-cols-3 divide-x divide-[var(--line)] border-y border-[var(--line)] py-2.5 my-0.5 bg-[var(--surface)]/40 rounded-xl flex-none">
            <div className="text-center px-1">
              <span className="block text-[20px] font-bold text-[var(--white)] font-mono leading-none">
                749+
              </span>
              <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider block mt-1">
                members
              </span>
            </div>
            <div className="text-center px-1">
              <span className="block text-[20px] font-bold text-[var(--white)] font-mono leading-none">
                15+
              </span>
              <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider block mt-1">
                events
              </span>
            </div>
            <div className="text-center px-1">
              <span className="block text-[20px] font-bold text-[var(--white)] font-mono leading-none">
                5+
              </span>
              <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider block mt-1">
                workshops
              </span>
            </div>
          </div>

          {/* 6. Compact Next Event mini-card with 3px Google gradient top strip */}
          <div className="w-full relative overflow-hidden rounded-2xl bg-[var(--surface-card)] border border-[var(--card-border)] p-3 space-y-1 shadow-md flex-none">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]" />
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#8db1ff] tracking-tight">
                NEXT: GDG Orientation
              </span>
              <span className="text-[11px] text-[var(--muted)]">
                Mon 17 Nov 2026
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--muted-bright)] pt-0.5">
              <span>Venue / Time: To be confirmed</span>
              <Link
                href="/events"
                className="text-[#8db1ff] font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Details</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 7. Scroll cue at bottom edge: animated chevron + SCROLL in 11px mono */}
        <div
          ref={mobileHintRef}
          className="flex flex-col items-center justify-center gap-0.5 select-none pointer-events-none flex-none pb-1 will-change-transform"
        >
          <span className="font-mono text-[11px] text-[var(--muted)] tracking-[0.2em] uppercase">
            SCROLL
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[var(--muted)] animate-bounce" />
        </div>
      </div>
    </section>
  );
}

export default SplitHero;

