"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ============================================================================
// DOTTED CHEVRON (SVG with 5-6px dots, 9.5px pitch, capsule bars)
// ============================================================================
interface JoinChevronProps {
  side: "left" | "right";
  active: boolean;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  className?: string;
}

function JoinChevron({
  side,
  active,
  dimmed,
  onHoverStart,
  onHoverEnd,
  className = "",
}: JoinChevronProps) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9-_]/g, "");
  const isLeft = side === "left";

  const topColor = isLeft ? "#EA4335" : "#34A853"; // Red for <, Green for >
  const bottomColor = isLeft ? "#4285F4" : "#FBBC04"; // Blue for <, Yellow for >

  const topPatternId = `join-p-top-${side}-${uid}`;
  const bottomPatternId = `join-p-bot-${side}-${uid}`;
  const topMaskId = `join-m-top-${side}-${uid}`;
  const bottomMaskId = `join-m-bot-${side}-${uid}`;
  const shadowFilterId = `join-s-${side}-${uid}`;

  // Pill coordinates (148x185 viewBox)
  // Stroke 44 with round linecaps extends 22px past endpoints
  const topX1 = isLeft ? 116 : 32;
  const topY1 = 34;
  const topX2 = isLeft ? 38 : 110;
  const topY2 = 92.5;

  const botX1 = isLeft ? 38 : 110;
  const botY1 = 92.5;
  const botX2 = isLeft ? 116 : 32;
  const botY2 = 151;

  const shadowDx = isLeft ? -2 : 2;

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onTouchStart={onHoverStart}
      className={`relative select-none cursor-pointer transition-all duration-300 ${
        active ? "scale-105 brightness-125 opacity-100" : ""
      } ${dimmed ? "opacity-60 scale-95" : "opacity-100"} ${className}`}
      style={{
        width: "148px",
        height: "185px",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 148 185"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Depth shadow between overlapping capsule pills */}
          <filter id={shadowFilterId} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx={shadowDx}
              dy="3"
              stdDeviation="3"
              floodColor="#000000"
              floodOpacity="0.75"
            />
          </filter>

          {/* Top Pill Dot Pattern (5.5px diameter, 9.5px pitch) */}
          <pattern
            id={topPatternId}
            width="9.5"
            height="9.5"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="4.75" cy="4.75" r="2.75" fill={topColor} />
          </pattern>

          {/* Bottom Pill Dot Pattern (5.5px diameter, 9.5px pitch) */}
          <pattern
            id={bottomPatternId}
            width="9.5"
            height="9.5"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="4.75" cy="4.75" r="2.75" fill={bottomColor} />
          </pattern>

          {/* Mask for Top Pill with rounded capsule ends */}
          <mask id={topMaskId}>
            <line
              x1={topX1}
              y1={topY1}
              x2={topX2}
              y2={topY2}
              stroke="white"
              strokeWidth="44"
              strokeLinecap="round"
            />
          </mask>

          {/* Mask for Bottom Pill with rounded capsule ends */}
          <mask id={bottomMaskId}>
            <line
              x1={botX1}
              y1={botY1}
              x2={botX2}
              y2={botY2}
              stroke="white"
              strokeWidth="44"
              strokeLinecap="round"
            />
          </mask>
        </defs>

        {/* Top Rounded Capsule Pill */}
        <g mask={`url(#${topMaskId})`}>
          <rect x="0" y="0" width="148" height="185" fill={`url(#${topPatternId})`} />
        </g>

        {/* Bottom Rounded Capsule Pill with shadow over top vertex */}
        <g mask={`url(#${bottomMaskId})`} filter={`url(#${shadowFilterId})`}>
          <rect x="0" y="0" width="148" height="185" fill={`url(#${bottomPatternId})`} />
        </g>
      </svg>
    </div>
  );
}

// ============================================================================
// FAINT DOT LATTICE (Canvas with Google colors, pointer glow, 1.2s touch decay)
// ============================================================================
function DotLatticeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const PITCH_X = 69;
    const PITCH_Y = 65;
    const DOT_RADIUS = 1.8;
    const GLOW_RADIUS = 180;
    const COLORS = ["#EA4335", "#34A853", "#FBBC04", "#4285F4"];

    const pointer = {
      x: -1000,
      y: -1000,
      active: false,
      isTouch: false,
      touchEndTime: 0,
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (prefersReducedMotion) {
        drawStatic();
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      const cols = Math.ceil(width / PITCH_X) + 1;
      const rows = Math.ceil(height / PITCH_Y) + 1;
      const offsetX = (width % PITCH_X) / 2;
      const offsetY = (height % PITCH_Y) / 2;

      for (let r = 0; r < rows; r++) {
        const y = r * PITCH_Y + offsetY;
        for (let c = 0; c < cols; c++) {
          const x = c * PITCH_X + offsetX;
          const color = COLORS[(c + r) % COLORS.length];
          ctx.beginPath();
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.12;
          ctx.fill();
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / PITCH_X) + 1;
      const rows = Math.ceil(height / PITCH_Y) + 1;
      const offsetX = (width % PITCH_X) / 2;
      const offsetY = (height % PITCH_Y) / 2;
      const now = performance.now();

      // Check touch fade
      let touchFactor = 1;
      if (pointer.isTouch && pointer.touchEndTime > 0) {
        const elapsed = now - pointer.touchEndTime;
        if (elapsed >= 1200) {
          pointer.active = false;
          pointer.touchEndTime = 0;
          touchFactor = 0;
        } else {
          touchFactor = 1 - elapsed / 1200;
        }
      }

      for (let r = 0; r < rows; r++) {
        const y = r * PITCH_Y + offsetY;
        for (let c = 0; c < cols; c++) {
          const x = c * PITCH_X + offsetX;
          const color = COLORS[(c + r) % COLORS.length];

          let alpha = 0.12;
          let radius = DOT_RADIUS;

          if (pointer.active && !prefersReducedMotion) {
            const dist = Math.hypot(x - pointer.x, y - pointer.y);
            if (dist < GLOW_RADIUS) {
              const t = 1 - dist / GLOW_RADIUS;
              const smooth = t * t * (3 - 2 * t) * touchFactor;
              alpha = 0.12 + smooth * 0.74; // up to ~0.86
              radius = DOT_RADIUS + smooth * 0.8; // up to ~2.6px
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    // Pointer events on parent
    const parent = canvas.parentElement;
    if (!parent) return;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      pointer.isTouch = false;
      pointer.touchEndTime = 0;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        pointer.x = e.touches[0].clientX - rect.left;
        pointer.y = e.touches[0].clientY - rect.top;
        pointer.active = true;
        pointer.isTouch = true;
        pointer.touchEndTime = 0;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        pointer.x = e.touches[0].clientX - rect.left;
        pointer.y = e.touches[0].clientY - rect.top;
        pointer.active = true;
        pointer.isTouch = true;
        pointer.touchEndTime = 0;
      }
    };

    const handleTouchEnd = () => {
      if (pointer.isTouch) {
        pointer.touchEndTime = performance.now();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    parent.addEventListener("mousemove", handlePointerMove, { passive: true });
    parent.addEventListener("mouseleave", handlePointerLeave);
    parent.addEventListener("touchstart", handleTouchStart, { passive: true });
    parent.addEventListener("touchmove", handleTouchMove, { passive: true });
    parent.addEventListener("touchend", handleTouchEnd, { passive: true });

    if (!prefersReducedMotion) {
      animationId = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      parent.removeEventListener("mousemove", handlePointerMove);
      parent.removeEventListener("mouseleave", handlePointerLeave);
      parent.removeEventListener("touchstart", handleTouchStart);
      parent.removeEventListener("touchmove", handleTouchMove);
      parent.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

// ============================================================================
// THE BAND — CLOSING JOIN BAND COMPONENT
// ============================================================================
export function JoinBand() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftChevronRef = useRef<HTMLDivElement | null>(null);
  const rightChevronRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);

  const [activeChevron, setActiveChevron] = useState<"left" | "right" | null>(
    null
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Scroll entrance animation: chevrons fade + slide from sides, headline lines up, buttons stagger 0.08s, all 0.9s, power4.out, once only
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 88%",
        once: true,
      },
    });

    if (leftChevronRef.current) {
      tl.fromTo(
        leftChevronRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power4.out", clearProps: "x,opacity" },
        0
      );
    }

    if (rightChevronRef.current) {
      tl.fromTo(
        rightChevronRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power4.out", clearProps: "x,opacity" },
        0
      );
    }

    if (headlineRef.current) {
      tl.fromTo(
        headlineRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power4.out", clearProps: "y,opacity" },
        0
      );
    }

    if (buttonsRef.current) {
      tl.fromTo(
        buttonsRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
          clearProps: "y,opacity",
        },
        0.18
      );
    }

    // Idle gentle pulse: scale 1 to 1.04, 2.4s loop, staggered 0.15s
    const idleTween1 = gsap.to(leftChevronRef.current, {
      scale: 1.04,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.9,
    });

    const idleTween2 = gsap.to(rightChevronRef.current, {
      scale: 1.04,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.05,
    });

    return () => {
      tl.kill();
      idleTween1.kill();
      idleTween2.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#121212] text-white py-24 sm:py-28 px-6 overflow-hidden border-t border-white/[0.06]"
      aria-label="Join GDG CSMU"
    >
      {/* Background Dot Lattice (faint regular grid with pointer glow) */}
      <DotLatticeCanvas />

      {/* Centred Container (max-width 1100px) */}
      <div className="relative z-10 max-w-[1100px] mx-auto flex flex-col items-center text-center">
        {/* Top Center Monospace Label: <join /> (desktop) */}
        <span className="hidden md:block font-mono text-[14px] sm:text-[15px] text-[#888888] tracking-widest uppercase select-none mb-[25px]">
          &lt;join /&gt;
        </span>

        {/* Mobile: chevrons stacked above headline at 60% size flanking <join /> (does not crowd headline) */}
        <div className="md:hidden flex items-center justify-center gap-5 mb-[20px]">
          <JoinChevron
            side="left"
            active={activeChevron === "left"}
            dimmed={activeChevron === "right"}
            onHoverStart={() => setActiveChevron("left")}
            onHoverEnd={() => setActiveChevron(null)}
            className="!w-[68px] !h-[85px]"
          />
          <span className="font-mono text-[14px] text-[#888888] tracking-widest uppercase select-none">
            &lt;join /&gt;
          </span>
          <JoinChevron
            side="right"
            active={activeChevron === "right"}
            dimmed={activeChevron === "left"}
            onHoverStart={() => setActiveChevron("right")}
            onHoverEnd={() => setActiveChevron(null)}
            className="!w-[68px] !h-[85px]"
          />
        </div>

        {/* Headline Row: On desktop (>= 768px), chevrons flank the headline left & right */}
        <div className="flex items-center justify-center gap-6 lg:gap-14 w-full">
          {/* Desktop Left Chevron (<) */}
          <div ref={leftChevronRef} className="hidden md:block flex-none">
            <JoinChevron
              side="left"
              active={activeChevron === "left"}
              dimmed={activeChevron === "right"}
              onHoverStart={() => setActiveChevron("left")}
              onHoverEnd={() => setActiveChevron(null)}
            />
          </div>

          {/* Headline: Build with us (65-70px, extra-bold rounded sans) */}
          <div className="flex-none">
            <h2
              ref={headlineRef}
              className="font-extrabold text-[46px] sm:text-[58px] md:text-[68px] lg:text-[70px] text-white tracking-tight leading-none text-center select-none"
            >
              Build with us
            </h2>
          </div>

          {/* Desktop Right Chevron (>) */}
          <div ref={rightChevronRef} className="hidden md:block flex-none">
            <JoinChevron
              side="right"
              active={activeChevron === "right"}
              dimmed={activeChevron === "left"}
              onHoverStart={() => setActiveChevron("right")}
              onHoverEnd={() => setActiveChevron(null)}
            />
          </div>
        </div>

        {/* Subtext (25px gap below headline) */}
        <p className="text-[16px] sm:text-[17px] text-[#A0A0A0] text-center max-w-xl mx-auto mt-[25px] leading-relaxed font-normal">
          Recruiting news goes out on Instagram first.
        </p>

        {/* Buttons: 25px gap below subtext, one row on desktop, stacked on mobile (gap 12px, 50px tall, fully rounded) */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-[12px] w-full sm:w-auto mt-[25px] max-w-[340px] sm:max-w-none"
        >
          {/* 1. Primary Button: White fill, black text, ~215px wide */}
          <a
            href="https://www.instagram.com/gdgoncampus.csmu"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#ffffff", color: "#000000" }}
            className="w-full sm:w-[215px] h-[50px] rounded-full !bg-white !text-black font-semibold text-[15px] inline-flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10 active:scale-[0.97]"
          >
            <span className="!text-black font-semibold">Follow on Instagram</span>
            <ArrowUpRight className="w-4 h-4 !text-black stroke-[2.4]" />
          </a>

          {/* 2. Dark Button: LinkedIn, ~135px wide */}
          <a
            href="https://www.linkedin.com/company/google-developer-group-on-campus-csmu"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ffffff" }}
            className="w-full sm:w-[135px] h-[50px] rounded-full bg-transparent border border-zinc-700 !text-white font-medium text-[15px] inline-flex items-center justify-center gap-2 transition-all duration-200 hover:border-white hover:bg-white/[0.08] active:scale-[0.97]"
          >
            <span className="!text-white font-medium">LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 !text-white stroke-[2.4]" />
          </a>

          {/* 3. Dark Button: See the calendar, ~160px wide */}
          <Link
            href="/events"
            style={{ color: "#ffffff" }}
            className="w-full sm:w-[160px] h-[50px] rounded-full bg-transparent border border-zinc-700 !text-white font-medium text-[15px] inline-flex items-center justify-center gap-2 transition-all duration-200 hover:border-white hover:bg-white/[0.08] active:scale-[0.97]"
          >
            <span className="!text-white font-medium">See the calendar</span>
            <ArrowUpRight className="w-4 h-4 !text-white stroke-[2.4]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default JoinBand;
