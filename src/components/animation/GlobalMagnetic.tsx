"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MOTION_TOKENS } from "./motionTokens";

/**
 * GlobalMagnetic provides continuous magnetic cursor pull to every button and
 * button-styled interactive element across the entire website on desktop.
 * It also handles mobile tap spring for touch devices.
 */
export function GlobalMagnetic() {
  const currentDesktopButtonRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const isDesktop = window.matchMedia("(pointer: fine) and (hover: hover)").matches;

    if (isDesktop) {
      // DESKTOP: Continuous magnetic pull for all buttons
      const releaseButton = (btn: HTMLElement) => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: MOTION_TOKENS.magneticReleaseDuration,
          ease: MOTION_TOKENS.magneticReleaseEase,
          overwrite: "auto",
        });
      };

      const handlePointerMove = (e: PointerEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        // Find nearest button or button-like element
        const btn = target.closest<HTMLElement>(
          "button, .button, [role='button'], [data-magnetic], .theme-toggle-btn, .menu-toggle"
        );

        // Respect explicit opt-outs
        if (btn && btn.hasAttribute("data-no-magnetic")) {
          if (currentDesktopButtonRef.current) {
            releaseButton(currentDesktopButtonRef.current);
            currentDesktopButtonRef.current = null;
          }
          return;
        }

        // If inside an explicit <Magnetic> wrapper, let that component handle it
        if (btn && btn.closest("[data-magnetic-container]")) {
          if (currentDesktopButtonRef.current) {
            releaseButton(currentDesktopButtonRef.current);
            currentDesktopButtonRef.current = null;
          }
          return;
        }

        if (btn) {
          // If cursor moved to a different button, release previous button
          if (currentDesktopButtonRef.current && currentDesktopButtonRef.current !== btn) {
            releaseButton(currentDesktopButtonRef.current);
          }
          currentDesktopButtonRef.current = btn;

          const rect = btn.getBoundingClientRect();
          // Subtract any existing GSAP transforms to get the stable untransformed center
          const currentX = (gsap.getProperty(btn, "x") as number) || 0;
          const currentY = (gsap.getProperty(btn, "y") as number) || 0;
          const centerX = rect.left - currentX + rect.width / 2;
          const centerY = rect.top - currentY + rect.height / 2;

          let deltaX = (e.clientX - centerX) * MOTION_TOKENS.magneticFollowScale;
          let deltaY = (e.clientY - centerY) * MOTION_TOKENS.magneticFollowScale;

          // Cap to max pull (8px)
          const maxPull = 8;
          deltaX = Math.max(-maxPull, Math.min(maxPull, deltaX));
          deltaY = Math.max(-maxPull, Math.min(maxPull, deltaY));

          gsap.to(btn, {
            x: deltaX,
            y: deltaY,
            duration: MOTION_TOKENS.durationUi,
            ease: MOTION_TOKENS.easeUi,
            overwrite: "auto",
          });
        } else {
          // Cursor is not over any button
          if (currentDesktopButtonRef.current) {
            releaseButton(currentDesktopButtonRef.current);
            currentDesktopButtonRef.current = null;
          }
        }
      };

      const handlePointerLeave = () => {
        if (currentDesktopButtonRef.current) {
          releaseButton(currentDesktopButtonRef.current);
          currentDesktopButtonRef.current = null;
        }
      };

      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.addEventListener("pointerleave", handlePointerLeave);
      window.addEventListener("blur", handlePointerLeave);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("blur", handlePointerLeave);
        if (currentDesktopButtonRef.current) {
          gsap.killTweensOf(currentDesktopButtonRef.current);
        }
      };
    } else {
      // MOBILE: Tap spring for all buttons on touch devices
      let currentTouchBtn: HTMLElement | null = null;

      const handleTouchStart = (e: TouchEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;

        const btn = target.closest<HTMLElement>(
          "button, .button, [role='button'], [data-magnetic], .theme-toggle-btn, .menu-toggle"
        );
        if (!btn || btn.hasAttribute("data-no-magnetic") || btn.closest("[data-magnetic-container]")) {
          return;
        }

        currentTouchBtn = btn;
        const touch = e.touches[0];
        if (!touch) return;

        const rect = btn.getBoundingClientRect();
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

        gsap.to(btn, {
          scale: 0.96,
          x: dirX,
          y: dirY,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleTouchEnd = () => {
        if (currentTouchBtn) {
          gsap.to(currentTouchBtn, {
            scale: 1,
            x: 0,
            y: 0,
            duration: 1.0,
            ease: "elastic.out(1, 0.3)",
            overwrite: "auto",
          });
          currentTouchBtn = null;
        }
      };

      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchend", handleTouchEnd, { passive: true });
      window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

      return () => {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
        window.removeEventListener("touchcancel", handleTouchEnd);
        if (currentTouchBtn) {
          gsap.killTweensOf(currentTouchBtn);
        }
      };
    }
  }, []);

  return null;
}

