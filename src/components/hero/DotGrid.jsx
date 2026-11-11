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
import { useCoarsePointer } from "@/hooks/useCoarsePointer";

export function DotGrid({ className = "" }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isCoarse = useCoarsePointer();

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

    // Mouse coordinates in canvas local space
    let targetX = -9999;
    let targetY = -9999;
    let renderedX = -9999;
    let renderedY = -9999;

    const isLightMode = () =>
      document.documentElement.classList.contains("light") ||
      document.documentElement.getAttribute("data-theme") === "light";

    const getBgColor = () => (isLightMode() ? "#f9f9fb" : "#101010");
    const getDotRgb = () => (isLightMode() ? "15, 23, 42" : "255, 255, 255");

    const isOffCondition = () =>
      prefersReducedMotion || isCoarse || window.innerWidth < 768;

    const drawStaticDotField = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = getBgColor();
      ctx.fillRect(0, 0, width, height);

      const rgb = getDotRgb();
      ctx.fillStyle = `rgba(${rgb}, ${BASE_ALPHA})`;
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

      // Smooth mouse lerp
      renderedX += (targetX - renderedX) * MOUSE_LERP;
      renderedY += (targetY - renderedY) * MOUSE_LERP;

      // Trail pass: fill canvas with background color at TRAIL_FADE_ALPHA
      ctx.globalCompositeOperation = "source-over";
      const bg = getBgColor();
      // Convert hex to rgba with TRAIL_FADE_ALPHA
      ctx.fillStyle =
        bg === "#101010"
          ? `rgba(16, 16, 16, ${TRAIL_FADE_ALPHA})`
          : `rgba(249, 249, 251, ${TRAIL_FADE_ALPHA})`;
      ctx.fillRect(0, 0, width, height);

      const rgb = getDotRgb();
      const glowDistSq = GLOW_RADIUS * GLOW_RADIUS;

      // 1. Draw base dots outside glow radius in one single batch pass
      ctx.fillStyle = `rgba(${rgb}, ${BASE_ALPHA})`;
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

      // 2. Draw glowing dots within GLOW_RADIUS
      const minX = Math.max(
        DOT_SPACING / 2,
        Math.floor((renderedX - GLOW_RADIUS) / DOT_SPACING) * DOT_SPACING + DOT_SPACING / 2
      );
      const maxX = Math.min(width, renderedX + GLOW_RADIUS);
      const minY = Math.max(
        DOT_SPACING / 2,
        Math.floor((renderedY - GLOW_RADIUS) / DOT_SPACING) * DOT_SPACING + DOT_SPACING / 2
      );
      const maxY = Math.min(height, renderedY + GLOW_RADIUS);

      for (let x = minX; x <= maxX; x += DOT_SPACING) {
        for (let y = minY; y <= maxY; y += DOT_SPACING) {
          const dx = x - renderedX;
          const dy = y - renderedY;
          const distSq = dx * dx + dy * dy;
          if (distSq < glowDistSq) {
            const d = Math.sqrt(distSq);
            const glow = Math.max(0, 1 - d / GLOW_RADIUS);
            const alpha = BASE_ALPHA + glow * GLOW_ALPHA_BONUS;
            const radius = DOT_BASE_RADIUS + glow * DOT_GLOW_RADIUS_BONUS;

            ctx.fillStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    const handlePointerMove = (e) => {
      if (isOffCondition()) return;
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      targetX = -9999;
      targetY = -9999;
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
      // Immediately clear to new background with zero delay
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

    // Pause when hero is off-screen
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
      heroContainer.addEventListener("pointermove", handlePointerMove, { passive: true });
      heroContainer.addEventListener("pointerleave", handlePointerLeave);
    }

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
      if (heroContainer) {
        heroContainer.removeEventListener("pointermove", handlePointerMove);
        heroContainer.removeEventListener("pointerleave", handlePointerLeave);
      }
      window.removeEventListener("resize", handleDebouncedResize);
      window.removeEventListener("theme-change", handleThemeChange);
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [prefersReducedMotion, isCoarse]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}

export default DotGrid;

