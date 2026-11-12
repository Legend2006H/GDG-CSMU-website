"use client";

import React, { useEffect, useRef } from "react";
import {
  DOT_SPACING,
  DOT_BASE_RADIUS,
  DOT_GLOW_RADIUS_BONUS,
  GLOW_RADIUS,
  BASE_ALPHA,
  GLOW_ALPHA_BONUS,
  MOUSE_LERP,
  TRAIL_FADE_ALPHA,
  PIXEL_RATIO_CAP,
} from "./heroConfig";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function DotGrid({ className = "" }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const heroContainer = canvas.closest("section") || canvas.parentElement;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animFrameId = 0;
    let isVisible = true;
    let resizeTimer = null;

    // Pointer coordinates in canvas local space
    let targetX = -9999;
    let targetY = -9999;
    let renderedX = -9999;
    let renderedY = -9999;

    // Mobile auto-drift & tap burst variables
    let isInteracting = false;
    let driftAngle = 0;
    let burstActive = false;
    let burstRadius = GLOW_RADIUS;
    let burstAlpha = GLOW_ALPHA_BONUS;

    // Water wave ripple state on click / tap
    const ripples = [];
    let lastClickTime = 0;
    let lastClickX = -9999;
    let lastClickY = -9999;
    let lastFrameTime = performance.now();

    const spawnRipple = (x, y) => {
      const now = performance.now();
      // Debounce duplicate events in virtually identical spot within 80ms (e.g. pointerdown + touchstart)
      if (now - lastClickTime < 80 && Math.hypot(x - lastClickX, y - lastClickY) < 20) {
        return;
      }
      lastClickTime = now;
      lastClickX = x;
      lastClickY = y;

      const isMobile = window.innerWidth < 768;
      const maxRadius = Math.max(width, height) * (isMobile ? 1.35 : 1.15);

      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius,
        speed: isMobile ? 520 : 620, // px per second
        wavelength: isMobile ? 85 : 110, // width of the wave crest band
        amplitude: isMobile ? 7 : 9.5, // max dot displacement (px)
        strength: 1.0,
      });

      // Keep max 5 active ripples to maintain high performance
      if (ripples.length > 5) {
        ripples.shift();
      }
    };

    const isLightMode = () =>
      document.documentElement.classList.contains("light") ||
      document.documentElement.getAttribute("data-theme") === "light";

    const getBgColor = () => (isLightMode() ? "#fafafa" : "#101010");
    const getDotRgb = () => (isLightMode() ? "100, 100, 100" : "255, 255, 255");

    const isOffCondition = () => prefersReducedMotion;

    const drawStaticDotField = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = getBgColor();
      ctx.fillRect(0, 0, width, height);

      const isMobile = window.innerWidth < 768;
      const rgb = getDotRgb();
      const dotAlpha = isLightMode() ? 0.22 : (isMobile ? 0.12 : BASE_ALPHA);
      ctx.fillStyle = `rgba(${rgb}, ${dotAlpha})`;
      ctx.beginPath();
      for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
          ctx.moveTo(x + DOT_BASE_RADIUS, y);
          ctx.arc(x, y, DOT_BASE_RADIUS, 0, Math.PI * 2);
        }
      }
      ctx.fill();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.ceil(rect.width);
      height = Math.ceil(rect.height);
      if (width === 0 || height === 0) return;

      const isMobile = window.innerWidth < 768;
      // Cap DPR 1 on mobile, 2 on desktop
      const maxDpr = isMobile ? 1 : PIXEL_RATIO_CAP;
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Initialize canvas background
      ctx.fillStyle = getBgColor();
      ctx.fillRect(0, 0, width, height);

      if (isOffCondition()) {
        drawStaticDotField();
      }
    };

    const render = () => {
      if (!isVisible || document.hidden) return;

      const isMobile = window.innerWidth < 768;

      // When finger lifts on mobile, drift the glow slowly (20s loop)
      if (isMobile && !isInteracting) {
        driftAngle += 0.005; // ~20s cycle
        const centerX = width / 2;
        const centerY = height / 2;
        const driftRadiusX = Math.min(width * 0.35, 140);
        const driftRadiusY = Math.min(height * 0.25, 100);

        targetX = centerX + Math.cos(driftAngle) * driftRadiusX;
        targetY = centerY + Math.sin(driftAngle * 1.5) * driftRadiusY;
      }

      // Smooth lerp
      renderedX += (targetX - renderedX) * MOUSE_LERP;
      renderedY += (targetY - renderedY) * MOUSE_LERP;

      // Handle tap glow burst on mobile (180px -> 260px, fade over 0.6s)
      let currentGlowRadius = GLOW_RADIUS;
      let currentGlowAlphaBonus = GLOW_ALPHA_BONUS;

      if (burstActive) {
        burstRadius += (260 - burstRadius) * 0.12;
        burstAlpha *= 0.94;
        currentGlowRadius = burstRadius;
        currentGlowAlphaBonus = burstAlpha;

        if (burstAlpha <= 0.05) {
          burstActive = false;
        }
      }

      // Trail pass: fill canvas with background color at TRAIL_FADE_ALPHA
      ctx.globalCompositeOperation = "source-over";
      const bg = getBgColor();
      ctx.fillStyle =
        bg === "#101010"
          ? `rgba(16, 16, 16, ${TRAIL_FADE_ALPHA})`
          : `rgba(249, 249, 251, ${TRAIL_FADE_ALPHA})`;
      ctx.fillRect(0, 0, width, height);

      const rgb = getDotRgb();
      const glowDistSq = currentGlowRadius * currentGlowRadius;

      // Update water wave ripples
      const now = performance.now();
      const dt = lastFrameTime > 0 ? Math.min((now - lastFrameTime) / 1000, 0.05) : 0.016;
      lastFrameTime = now;

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += rip.speed * dt;
        rip.strength = Math.max(0, 1 - Math.pow(rip.radius / rip.maxRadius, 1.25));

        if (rip.radius >= rip.maxRadius || rip.strength <= 0.01) {
          ripples.splice(i, 1);
        } else {
          const minR = Math.max(0, rip.radius - rip.wavelength);
          const maxR = rip.radius + rip.wavelength;
          rip.minDistSq = minR * minR;
          rip.maxDistSq = maxR * maxR;
        }
      }

      const hasRipples = ripples.length > 0;
      const baseDotAlpha = isLightMode() ? 0.22 : (isMobile ? 0.12 : BASE_ALPHA);

      if (!hasRipples) {
        // Fast path: draw base dots outside glow radius in one single batch pass
        ctx.fillStyle = `rgba(${rgb}, ${baseDotAlpha})`;
        ctx.beginPath();
        for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
          for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
            const dx = x - renderedX;
            const dy = y - renderedY;
            if (dx * dx + dy * dy < glowDistSq) continue;
            ctx.moveTo(x + DOT_BASE_RADIUS, y);
            ctx.arc(x, y, DOT_BASE_RADIUS, 0, Math.PI * 2);
          }
        }
        ctx.fill();

        // Draw glowing dots within glow radius
        const minX = Math.max(
          DOT_SPACING / 2,
          Math.floor((renderedX - currentGlowRadius) / DOT_SPACING) * DOT_SPACING + DOT_SPACING / 2
        );
        const maxX = Math.min(width, renderedX + currentGlowRadius);
        const minY = Math.max(
          DOT_SPACING / 2,
          Math.floor((renderedY - currentGlowRadius) / DOT_SPACING) * DOT_SPACING + DOT_SPACING / 2
        );
        const maxY = Math.min(height, renderedY + currentGlowRadius);

        for (let x = minX; x <= maxX; x += DOT_SPACING) {
          for (let y = minY; y <= maxY; y += DOT_SPACING) {
            const dx = x - renderedX;
            const dy = y - renderedY;
            const distSq = dx * dx + dy * dy;
            if (distSq < glowDistSq) {
              const d = Math.sqrt(distSq);
              const glow = Math.max(0, 1 - d / currentGlowRadius);
              const alpha = baseDotAlpha + glow * currentGlowAlphaBonus;
              const radius = DOT_BASE_RADIUS + glow * DOT_GLOW_RADIUS_BONUS;

              ctx.fillStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
              ctx.beginPath();
              ctx.arc(x, y, radius, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      } else {
        // Water wave ripple path: compute physical wave displacement & crest glow
        ctx.fillStyle = `rgba(${rgb}, ${baseDotAlpha})`;
        ctx.beginPath();

        // 1. Batch undisturbed dots in single call
        for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
          for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
            const mDx = x - renderedX;
            const mDy = y - renderedY;
            if (mDx * mDx + mDy * mDy < glowDistSq) continue;

            let inRipple = false;
            for (let r = 0; r < ripples.length; r++) {
              const rip = ripples[r];
              const rDx = x - rip.x;
              const rDy = y - rip.y;
              const rDistSq = rDx * rDx + rDy * rDy;
              if (rDistSq >= rip.minDistSq && rDistSq <= rip.maxDistSq) {
                inRipple = true;
                break;
              }
            }
            if (inRipple) continue;

            ctx.moveTo(x + DOT_BASE_RADIUS, y);
            ctx.arc(x, y, DOT_BASE_RADIUS, 0, Math.PI * 2);
          }
        }
        ctx.fill();

        // 2. Draw disturbed dots (ripples + glow) with concentric water wave displacement
        for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
          for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
            const mDx = x - renderedX;
            const mDy = y - renderedY;
            const mDistSq = mDx * mDx + mDy * mDy;
            const inMouse = mDistSq < glowDistSq;

            let inRipple = false;
            let dispX = 0;
            let dispY = 0;
            let extraAlpha = 0;
            let extraRadius = 0;

            for (let r = 0; r < ripples.length; r++) {
              const rip = ripples[r];
              const rDx = x - rip.x;
              const rDy = y - rip.y;
              const rDistSq = rDx * rDx + rDy * rDy;
              if (rDistSq >= rip.minDistSq && rDistSq <= rip.maxDistSq) {
                inRipple = true;
                const d = Math.sqrt(rDistSq);
                const delta = d - rip.radius;
                const norm = delta / rip.wavelength; // -1 to +1
                // Smooth Hann cosine envelope (zero at edges, 1 at center)
                const envelope = Math.cos(norm * (Math.PI / 2));
                // Concentric sinusoidal wave crests & troughs for realistic liquid oscillation
                const wave = Math.sin(-norm * Math.PI * 2) * envelope * rip.strength;

                if (d > 1) {
                  dispX += (rDx / d) * wave * rip.amplitude;
                  dispY += (rDy / d) * wave * rip.amplitude;
                }

                const crest = Math.max(0, envelope * rip.strength);
                extraAlpha += crest * 0.75;
                extraRadius += crest * 2.2;
              }
            }

            if (!inRipple && !inMouse) continue;

            let mouseAlpha = 0;
            let mouseRadius = 0;
            if (inMouse) {
              const d = Math.sqrt(mDistSq);
              const glow = Math.max(0, 1 - d / currentGlowRadius);
              mouseAlpha = glow * currentGlowAlphaBonus;
              mouseRadius = glow * DOT_GLOW_RADIUS_BONUS;
            }

            const finalAlpha = Math.min(0.95, baseDotAlpha + mouseAlpha + extraAlpha);
            const finalRadius = DOT_BASE_RADIUS + mouseRadius + extraRadius;

            ctx.fillStyle = `rgba(${rgb}, ${finalAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(x + dispX, y + dispY, finalRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    const handlePointerMove = (e) => {
      if (isOffCondition()) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Track pointer whenever cursor is within the visible canvas viewport area
      if (x >= -60 && x <= width + 60 && y >= -60 && y <= height + 60) {
        targetX = x;
        targetY = y;
        isInteracting = true;
      } else {
        isInteracting = false;
        const isMobile = window.innerWidth < 768;
        if (!isMobile) {
          targetX = -9999;
          targetY = -9999;
        }
      }
    };

    const handlePointerLeave = () => {
      isInteracting = false;
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        targetX = -9999;
        targetY = -9999;
      }
    };

    const handlePointerDown = (e) => {
      if (isOffCondition() || !isVisible) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        spawnRipple(x, y);
      }
    };

    // Touch handlers for mobile
    const handleTouchStart = (e) => {
      if (isOffCondition() || !isVisible) return;
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        targetX = x;
        targetY = y;
        isInteracting = true;

        // Trigger water wave ripple
        spawnRipple(x, y);

        // Trigger tap burst
        burstActive = true;
        burstRadius = GLOW_RADIUS;
        burstAlpha = GLOW_ALPHA_BONUS;
      }
    };

    const handleTouchMove = (e) => {
      if (isOffCondition()) return;
      const touch = e.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      if (x >= -40 && x <= width + 40 && y >= -40 && y <= height + 40) {
        targetX = x;
        targetY = y;
        isInteracting = true;
      }
    };

    const handleTouchEnd = () => {
      isInteracting = false;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameId);
      } else if (isVisible && !isOffCondition()) {
        cancelAnimationFrame(animFrameId);
        animFrameId = requestAnimationFrame(render);
      }
    };

    const handleDebouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (isOffCondition()) {
          cancelAnimationFrame(animFrameId);
          drawStaticDotField();
        } else if (isVisible && !document.hidden) {
          cancelAnimationFrame(animFrameId);
          animFrameId = requestAnimationFrame(render);
        }
      }, 100);
    };

    const handleThemeChange = () => {
      ctx.fillStyle = getBgColor();
      ctx.fillRect(0, 0, width, height);
      if (isOffCondition()) {
        drawStaticDotField();
      }
    };

    window.addEventListener("theme-change", handleThemeChange);

    const themeObserver = new MutationObserver(() => {
      handleThemeChange();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !isOffCondition() && !document.hidden) {
          cancelAnimationFrame(animFrameId);
          animFrameId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animFrameId);
        }
      },
      { threshold: 0 }
    );

    if (heroContainer) {
      observer.observe(heroContainer);
    }

    // Window-level pointer tracking ensures smooth 1:1 synchronization with custom cursor & click ripples
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // ResizeObserver on canvas ensures internal bitmap buffer matches CSS layout 1:1 without vertical stretching
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (isOffCondition()) {
        drawStaticDotField();
      }
    });
    resizeObserver.observe(canvas);

    window.addEventListener("resize", handleDebouncedResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    resize();

    if (!isOffCondition()) {
      animFrameId = requestAnimationFrame(render);
    } else {
      drawStaticDotField();
    }

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(resizeTimer);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleDebouncedResize);
      window.removeEventListener("theme-change", handleThemeChange);
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}

export default DotGrid;
