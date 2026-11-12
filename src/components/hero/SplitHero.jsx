"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
  const [hoveredChevron, setHoveredChevron] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Initial load animations: chevrons fade + slide from sides, headline lines up
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
            ease: "power4.out",
          }
        );
      }

      if (!prefersReducedMotion) {
        // Chevrons fade + slide in from sides: left from x -40, right from x +40, 0.9s, power4.out
        const leftChevrons = [leftChevronRef.current, mobileLeftChevronRef.current].filter(Boolean);
        const rightChevrons = [rightChevronRef.current, mobileRightChevronRef.current].filter(Boolean);

        if (leftChevrons.length > 0) {
          gsap.fromTo(
            leftChevrons,
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: "power4.out", clearProps: "x" }
          );
        }
        if (rightChevrons.length > 0) {
          gsap.fromTo(
            rightChevrons,
            { x: 40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: "power4.out", clearProps: "x" }
          );
        }

        // Idle gentle pulse: scale 1 to 1.04, 2.4s loop, staggered 0.15s
        gsap.to(leftChevrons, {
          scale: 1.04,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.9,
        });
        gsap.to(rightChevrons, {
          scale: 1.04,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.05,
        });
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

        // 2. Chevrons travel outward fast (immediate response on scroll)
        if (leftChevronRef.current) {
          tl.to(
            leftChevronRef.current,
            {
              xPercent: -CHEVRON_TRAVEL,
              opacity: 0,
              duration: 0.65,
              ease: "power2.out",
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
              duration: 0.65,
              ease: "power2.out",
            },
            0
          );
        }

        // 3. Title halves split fast (0 -> 0.75, power2.out)
        if (leftRef.current) {
          tl.to(
            leftRef.current,
            {
              xPercent: -TITLE_TRAVEL,
              opacity: 0,
              duration: 0.75,
              ease: "power2.out",
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
              duration: 0.75,
              ease: "power2.out",
            },
            0
          );
        }

        // 4. Content meta group (subtext + buttons + stats): stays fully visible and interactive while scrolling,
        // only fading at the very end of the hero timeline (0.85 -> 1.0) as the hero unpins
        if (metaRef.current) {
          tl.to(
            metaRef.current,
            {
              opacity: 0,
              y: -16,
              duration: 0.15,
              ease: "power2.in",
            },
            0.85
          );
        }

        if (eyebrowRef.current) {
          tl.to(
            eyebrowRef.current,
            {
              opacity: 0,
              y: -10,
              duration: 0.15,
              ease: "power2.in",
            },
            0.85
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
            scrub: 0.3,
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

        // 2. Chevrons travel outward fast (matching -120 / +120)
        if (mobileLeftChevronRef.current) {
          tl.to(
            mobileLeftChevronRef.current,
            { xPercent: -120, opacity: 0, duration: 0.65, ease: "power2.out" },
            0
          );
        }
        if (mobileRightChevronRef.current) {
          tl.to(
            mobileRightChevronRef.current,
            { xPercent: 120, opacity: 0, duration: 0.65, ease: "power2.out" },
            0
          );
        }

        // 3. Title halves split outward fast
        if (mobileLeftRef.current) {
          tl.to(
            mobileLeftRef.current,
            { xPercent: -90, opacity: 0, duration: 0.75, ease: "power2.out" },
            0
          );
        }
        if (mobileRightRef.current) {
          tl.to(
            mobileRightRef.current,
            { xPercent: 90, opacity: 0, duration: 0.75, ease: "power2.out" },
            0
          );
        }

        // 4. Content group (subtext, buttons, stats, next event): stays fully visible while scrolling,
        // only fading at the very end of the scroll animation (0.85 -> 1.0)
        if (mobileMetaRef.current) {
          tl.to(
            mobileMetaRef.current,
            { opacity: 0, y: -16, duration: 0.15, ease: "power2.in" },
            0.85
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
      className="relative w-full bg-[var(--bg)] h-[120svh] md:h-auto min-h-[100svh]"
      style={{ height: isAnimated ? HERO_SCROLL_HEIGHT : undefined }}
    >
      {/* Background Dot-Grid with Mouse & Touch Glow — sticky viewport container prevents canvas stretching and keeps glow 1:1 synced to cursor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="sticky top-0 left-0 w-full h-[100svh] md:h-screen overflow-hidden">
          <DotGrid />
        </div>
      </div>

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
            className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 py-2 select-none w-full max-w-full"
            aria-label="< GDG CSMU >"
          >
            {/* LEFT HALF: [ < ] [ GDG ] */}
            <span
              ref={leftRef}
              aria-hidden="true"
              className="flex items-center gap-4 sm:gap-5 md:gap-8 will-change-transform"
            >
              <span ref={leftChevronRef} className="inline-block will-change-transform flex-none">
                <DottedChevron
                  side="left"
                  active={hoveredChevron === "left"}
                  dimmed={hoveredChevron === "right"}
                  onHoverStart={() => setHoveredChevron("left")}
                  onHoverEnd={() => setHoveredChevron(null)}
                  className="w-[130px] h-[155px] md:w-[150px] md:h-[178px] lg:w-[170px] lg:h-[200px]"
                />
              </span>
              <span className="font-bold tracking-tight text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-[var(--hero-title)] whitespace-nowrap leading-none">
                GDG
              </span>
            </span>

            {/* RIGHT HALF: [ CSMU ] [ > ] */}
            <span
              ref={rightRef}
              aria-hidden="true"
              className="flex items-center gap-4 sm:gap-5 md:gap-8 will-change-transform"
            >
              <span className="font-bold tracking-tight text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-[var(--hero-title)] whitespace-nowrap leading-none">
                CSMU
              </span>
              <span ref={rightChevronRef} className="inline-block will-change-transform flex-none">
                <DottedChevron
                  side="right"
                  active={hoveredChevron === "right"}
                  dimmed={hoveredChevron === "left"}
                  onHoverStart={() => setHoveredChevron("right")}
                  onHoverEnd={() => setHoveredChevron(null)}
                  className="w-[130px] h-[155px] md:w-[150px] md:h-[178px] lg:w-[170px] lg:h-[200px]"
                />
              </span>
            </span>
          </h1>

          {/* Subtext + Buttons + Stats + Scroll Hint (meta group matching benchmark) */}
          <div
            ref={metaRef}
            className="flex flex-col items-center space-y-6 sm:space-y-7 mt-6 sm:mt-7 max-w-2xl will-change-transform"
          >
            <p className="text-sm sm:text-base text-[var(--muted-bright)] font-normal leading-relaxed px-4 max-w-xl">
              CSMU&apos;s student developer community. We connect, learn, and
              grow, then ship what we build.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Magnetic strength={0.3} maxPull={8} padding={16}>
                <Link
                  href="/events"
                  className="px-6 py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold inline-flex items-center gap-2 hover:bg-zinc-100 active:scale-95 transition-all shadow-md"
                >
                  <span className="text-black font-semibold">See sessions</span>
                  <ArrowRight className="w-4 h-4 text-black stroke-[2.2]" />
                </Link>
              </Magnetic>
              <Link
                href="/projects"
                className="px-6 py-2.5 rounded-full bg-white/[0.04] border border-white/20 hover:border-white/40 hover:bg-white/[0.08] active:scale-95 text-white text-xs sm:text-sm font-medium inline-flex items-center transition-all"
              >
                <span>See projects</span>
              </Link>
            </div>

            {/* Bottom Stats Strip (Canonical Numbers with Google colors: Blue, Green, Red, Yellow - no duplicate bullets) */}
            <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-mono text-xs sm:text-[13px] text-zinc-400">
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                <span>750+ members</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                <span>15+ events</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                <span>30+ speakers</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC04]" />
                <span>6 tech tracks</span>
              </span>
            </div>

            {/* Desktop scroll hint: directly below stats strip matching reference */}
            {isAnimated && (
              <div
                ref={hintRef}
                className="pt-2 flex flex-col items-center justify-center select-none pointer-events-none will-change-transform"
              >
                <span className="font-mono text-[10px] sm:text-[11px] text-[var(--muted)] tracking-[0.25em] uppercase">
                  SCROLL TO OPEN
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom breathing space */}
        <div className="w-full h-8 sm:h-12 flex-none" />
      </div>

      {/* =========================================================================
          MOBILE HERO (<768px): Exact 100svh fill + smooth split scroll animation
          Benchmarked layout matching reference mobile screen
         ========================================================================= */}
      <div
        ref={mobileStickyRef}
        className="md:hidden sticky top-0 z-10 w-full h-[100svh] min-h-[100svh] max-h-[100svh] flex flex-col justify-between items-center px-6 pt-24 pb-6 overflow-hidden max-w-sm sm:max-w-md mx-auto will-change-transform"
      >
        {/* 1. Eyebrow: 2 lines matching reference layout */}
        <div className="w-full text-center flex-none">
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[var(--hero-eyebrow)] font-medium leading-relaxed">
            GOOGLE DEVELOPER GROUPS ON CAMPUS
            <br />
            CSMU PANVEL
          </p>
        </div>

        {/* 2. Headline with 3D Chevrons flanking stacked GDG CSMU */}
        <h1
          className="flex items-center justify-center gap-2 sm:gap-3 py-1 select-none w-full flex-none overflow-visible"
          aria-label="< GDG CSMU >"
        >
          {/* Left Chevron (scaled to ~60% size, ~88x104 to 100x120) */}
          <span
            ref={mobileLeftChevronRef}
            className="inline-flex items-center justify-center flex-none will-change-transform"
          >
            <DottedChevron
              side="left"
              active={hoveredChevron === "left"}
              dimmed={hoveredChevron === "right"}
              onHoverStart={() => setHoveredChevron("left")}
              onHoverEnd={() => setHoveredChevron(null)}
              className="!w-[88px] !h-[104px] sm:!w-[100px] sm:!h-[120px]"
            />
          </span>

          {/* Center Stacked Words */}
          <span className="flex flex-col items-center justify-center text-center leading-[0.92] select-none flex-none">
            <span
              ref={mobileLeftRef}
              className="font-bold tracking-tight text-[clamp(44px,12.5vw,62px)] text-[var(--hero-title)] leading-[0.92] inline-block will-change-transform"
            >
              GDG
            </span>
            <span
              ref={mobileRightRef}
              className="font-bold tracking-tight text-[clamp(44px,12.5vw,62px)] text-[var(--hero-title)] leading-[0.92] inline-block will-change-transform"
            >
              CSMU
            </span>
          </span>

          {/* Right Chevron (scaled to ~60% size) */}
          <span
            ref={mobileRightChevronRef}
            className="inline-flex items-center justify-center flex-none will-change-transform"
          >
            <DottedChevron
              side="right"
              active={hoveredChevron === "right"}
              dimmed={hoveredChevron === "left"}
              onHoverStart={() => setHoveredChevron("right")}
              onHoverEnd={() => setHoveredChevron(null)}
              className="!w-[88px] !h-[104px] sm:!w-[100px] sm:!h-[120px]"
            />
          </span>
        </h1>

        {/* 3. Subtitle + Buttons group */}
        <div
          ref={mobileMetaRef}
          className="w-full flex flex-col items-center gap-4 sm:gap-5 flex-none will-change-transform"
        >
          {/* Subtext */}
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--muted-bright)] max-w-[300px] sm:max-w-[320px] text-center mx-auto flex-none font-normal">
            CSMU&apos;s student developer community. We connect, learn, and grow, then ship what we build.
          </p>

          {/* 4. Stacked CTAs matching mobile benchmark */}
          <div className="w-full max-w-[320px] flex flex-col gap-2.5 flex-none mx-auto">
            <Link
              href="/events"
              style={{ backgroundColor: "#ffffff", color: "#000000" }}
              className="w-full h-12 rounded-full !bg-white !text-black font-semibold text-sm flex items-center justify-center gap-2 hover:!bg-zinc-100 active:scale-95 transition-all shadow-md"
            >
              <span className="!text-black font-semibold">See sessions</span>
              <ArrowRight className="w-4 h-4 !text-black stroke-[2.2]" />
            </Link>
            <Link
              href="/projects"
              className="w-full h-12 rounded-full bg-[var(--surface-highlight)] border border-[var(--line)] text-[var(--white)] font-medium text-sm flex items-center justify-center hover:border-zinc-500 active:scale-95 transition-all"
            >
              <span>See projects</span>
            </Link>
          </div>
        </div>

        {/* 5. Bottom Meta & Scroll Cue matching benchmark */}
        <div className="w-full flex flex-col items-center gap-2 text-center flex-none">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] text-[var(--muted)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
              <span>750+ members</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
              <span>15+ events</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
              <span>30+ speakers</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC04]" />
              <span>6 tracks</span>
            </span>
          </div>

          <div
            ref={mobileHintRef}
            className="flex flex-col items-center justify-center select-none pointer-events-none pt-1 will-change-transform"
          >
            <span className="font-mono text-[10px] sm:text-[11px] text-[var(--muted)] tracking-[0.25em] uppercase">
              SCROLL TO OPEN
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SplitHero;

