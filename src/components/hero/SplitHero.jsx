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

  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Initial SplitText reveal for the headline on page entrance
    document.fonts.ready.then(() => {
      if (leftRef.current && rightRef.current) {
        gsap.fromTo(
          [leftRef.current, rightRef.current],
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.09,
            ease: "expo.out",
          }
        );
      }
    });

    const mm = gsap.matchMedia();

    // Animate on both desktop and mobile as long as prefers-reduced-motion is no-preference
    mm.add(
      "(prefers-reduced-motion: no-preference)",
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
      className="relative w-full bg-[var(--bg)]"
      style={{ height: isAnimated ? HERO_SCROLL_HEIGHT : "100svh" }}
    >
      {/* Pinned inner viewport */}
      <div
        ref={stickyRef}
        className={
          isAnimated
            ? "sticky top-0 h-screen overflow-hidden flex flex-col justify-between items-center px-4 sm:px-6 py-6 md:py-10 z-10"
            : "relative h-screen overflow-hidden flex flex-col justify-between items-center px-4 sm:px-6 py-6 md:py-10 z-10"
        }
      >
        {/* Background Dot-Grid with Mouse Glow */}
        <DotGrid />

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

        {/* Scroll hint: only rendered when animation is active */}
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
    </section>
  );
}

export default SplitHero;

