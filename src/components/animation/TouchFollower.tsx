"use client";

import React, { useEffect, useState } from "react";

interface TouchRipple {
  id: number;
  x: number;
  y: number;
  color: string;
}

const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];

export function TouchFollower() {
  const [ripples, setRipples] = useState<TouchRipple[]>([]);
  const [touchDot, setTouchDot] = useState<{ x: number; y: number; opacity: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let colorIndex = 0;
    let fadeTimer: NodeJS.Timeout;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const x = touch.clientX;
      const y = touch.clientY;
      const color = GOOGLE_COLORS[colorIndex % GOOGLE_COLORS.length];
      colorIndex++;

      // Update soft glow dot at touch point
      setTouchDot({ x, y, opacity: 0.8 });
      clearTimeout(fadeTimer);

      // Create expanding ripple
      const newRipple: TouchRipple = {
        id: Date.now() + Math.random(),
        x,
        y,
        color,
      };

      setRipples((prev) => [...prev.slice(-4), newRipple]);

      // Remove ripple after 600ms
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 650);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      setTouchDot({ x: touch.clientX, y: touch.clientY, opacity: 0.8 });
      clearTimeout(fadeTimer);
    };

    const handleTouchEnd = () => {
      // Glow dot fades out over 1.2s when finger lifts
      fadeTimer = setTimeout(() => {
        setTouchDot((prev) => (prev ? { ...prev, opacity: 0 } : null));
      }, 300);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      clearTimeout(fadeTimer);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
    >
      {/* Soft trailing glow dot following last touch point */}
      {touchDot && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-md transition-opacity duration-1000 ease-out"
          style={{
            left: `${touchDot.x}px`,
            top: `${touchDot.y}px`,
            width: "36px",
            height: "36px",
            opacity: touchDot.opacity,
            background: "radial-gradient(circle, rgba(66, 133, 244, 0.45) 0%, rgba(66, 133, 244, 0) 70%)",
          }}
        />
      )}

      {/* Tap expanding ring ripples cycling Google colours */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="animate-touch-ripple absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 pointer-events-none"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            borderColor: ripple.color,
          }}
        />
      ))}
    </div>
  );
}
