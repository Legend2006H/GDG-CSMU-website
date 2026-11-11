"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [cursorLabel, setCursorLabel] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Strict desktop check: pointer must be fine and hover supported
    const isDesktop = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isDesktop || prefersReducedMotion) {
      // Never show or hide cursor on touch / mobile or reduced motion
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Only hide native cursor when JS cursor is actually mounted and running
    document.documentElement.classList.add("has-custom-cursor");

    // Initial position off-screen
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    // GSAP quickTo: dot duration 0.15s power3, ring duration 0.45s power3
    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const ringXTo = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringYTo = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let isVisible = false;

    const handlePointerMove = (e: PointerEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }

      dotXTo(e.clientX);
      dotYTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);

      // Check hover state via event target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest<HTMLElement>("[data-cursor]");
      const interactiveTarget = target.closest<HTMLElement>("a, button, [role='button'], .cursor-pointer");

      if (cursorTarget && cursorTarget.dataset.cursor) {
        // State 3: Card hover with data-cursor="VIEW" | "EXPLORE" | "JOIN"
        // Ring grows to 72px, fills with 0.08 opacity, shows label inside ring
        setCursorLabel(cursorTarget.dataset.cursor);
        gsap.to(ring, {
          width: 72,
          height: 72,
          borderColor: "#4285F4",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (interactiveTarget) {
        // State 2: Link / button hover
        // Ring grows to 56px, border turns Google blue #4285F4, dot stays 8px
        setCursorLabel("");
        gsap.to(ring, {
          width: 56,
          height: 56,
          borderColor: "#4285F4",
          backgroundColor: "transparent",
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        // State 1: Default
        // 8px dot + 36px ring, ring opacity 0.7
        setCursorLabel("");
        const isLight = document.documentElement.classList.contains("light") ||
                        document.documentElement.getAttribute("data-theme") === "light";
        const defaultBorder = isLight ? "#111111" : "#ffffff";

        gsap.to(ring, {
          width: 36,
          height: 36,
          borderColor: defaultBorder,
          backgroundColor: "transparent",
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handlePointerLeave = () => {
      isVisible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none hidden md:block"
    >
      {/* 8px dot that follows instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none opacity-0 will-change-transform z-[9999] cursor-dot"
      />

      {/* 36px ring that trails behind with lag */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border-[1.5px] pointer-events-none opacity-0 will-change-transform z-[9998] flex items-center justify-center cursor-ring"
      >
        {cursorLabel && (
          <span
            ref={labelRef}
            className="font-mono text-[10px] font-bold tracking-wider select-none text-white cursor-label"
          >
            {cursorLabel}
          </span>
        )}
      </div>
    </div>
  );
}
