"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { MOTION_TOKENS } from "./motionTokens";

interface MagneticProps {
  children: React.ReactElement;
  className?: string;
  strength?: number; // default 0.3
  padding?: number;  // expanded hit area in px, default 24
}

export function Magnetic({
  children,
  className = "",
  strength = MOTION_TOKENS.magneticFollowScale,
  padding = 24,
}: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    // Strict desktop check: pointer must be fine and hover supported
    const isDesktop = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isDesktop || prefersReducedMotion) {
      // Disabled on mobile/touch and under reduced motion
      return;
    }

    // Set up quickTo for ultra-smooth 60+ fps pointer following
    const xTo = gsap.quickTo(target, "x", {
      duration: MOTION_TOKENS.durationUi,
      ease: MOTION_TOKENS.easeUi,
    });
    const yTo = gsap.quickTo(target, "y", {
      duration: MOTION_TOKENS.durationUi,
      ease: MOTION_TOKENS.easeUi,
    });

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      xTo(deltaX);
      yTo(deltaY);
    };

    const handlePointerLeave = () => {
      // Elastic release back to center
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: MOTION_TOKENS.magneticReleaseDuration,
        ease: MOTION_TOKENS.magneticReleaseEase,
        overwrite: "auto",
      });
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      gsap.killTweensOf(target);
    };
  }, [strength]);

  return (
    <div
      ref={containerRef}
      className={`inline-block relative ${className}`}
      style={{ padding: `${padding}px`, margin: `-${padding}px` }}
    >
      <div ref={targetRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}

