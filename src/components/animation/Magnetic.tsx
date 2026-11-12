"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { MOTION_TOKENS } from "./motionTokens";

interface MagneticProps {
  children: React.ReactElement;
  className?: string;
  strength?: number; // default 0.3
  maxPull?: number;  // max px pull, default 8
  padding?: number;  // expanded hit area in px, default 24
}

export function Magnetic({
  children,
  className = "",
  strength = MOTION_TOKENS.magneticFollowScale,
  maxPull = 8,
  padding = 24,
}: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const isDesktop = window.matchMedia("(pointer: fine) and (hover: hover)").matches;

    if (isDesktop) {
      // DESKTOP: Smooth continuous magnetic cursor pull
      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let deltaX = (e.clientX - centerX) * strength;
        let deltaY = (e.clientY - centerY) * strength;

        // Cap to maxPull (max 8px)
        deltaX = Math.max(-maxPull, Math.min(maxPull, deltaX));
        deltaY = Math.max(-maxPull, Math.min(maxPull, deltaY));

        gsap.to(target, {
          x: deltaX,
          y: deltaY,
          duration: MOTION_TOKENS.durationUi,
          ease: MOTION_TOKENS.easeUi,
          overwrite: "auto",
        });
      };

      const handlePointerLeave = () => {
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
    } else {
      // MOBILE (RULE 1 #3): TAP SPRING
      // On touchstart: scale 0.96 and pull 4px toward finger, optional vibrate(10)
      // On touchend: spring back with elastic.out(1, 0.3), 1.0s
      const handleTouchStart = (e: TouchEvent) => {
        const touch = e.touches[0];
        if (!touch) return;

        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dirX = touch.clientX > centerX ? 4 : -4;
        const dirY = touch.clientY > centerY ? 4 : -4;

        if (typeof navigator !== "undefined" && navigator.vibrate) {
          try {
            navigator.vibrate(10);
          } catch {
            // ignore vibrate errors if blocked
          }
        }

        gsap.to(target, {
          scale: 0.96,
          x: dirX,
          y: dirY,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleTouchEnd = () => {
        gsap.to(target, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 1.0,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto",
        });
      };

      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
      container.addEventListener("touchcancel", handleTouchEnd, { passive: true });

      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
        container.removeEventListener("touchcancel", handleTouchEnd);
        gsap.killTweensOf(target);
      };
    }
  }, [strength, maxPull]);

  return (
    <div
      ref={containerRef}
      data-magnetic-container="true"
      className={`inline-block relative min-w-[44px] min-h-[44px] flex items-center justify-center ${className}`}
      style={{ padding: `${padding}px`, margin: `-${padding}px` }}
    >
      <div ref={targetRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
