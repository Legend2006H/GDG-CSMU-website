"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;      // degrees, default 12
  scale?: number;        // scale on hover, default 1.03
  glare?: boolean;       // whether to render 3D specular glare, default true
  perspective?: number;  // px, default 1000
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  scale = 1.03,
  glare = true,
  perspective = 1000,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  // Mobile Tap + Scroll lift effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile && !prefersReducedMotion) {
      gsap.registerPlugin(ScrollTrigger);

      // Lift automatically as card scrolls into view
      const st = ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        end: "top 30%",
        onEnter: () => {
          gsap.fromTo(
            card,
            { y: 8, opacity: 0.95 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" }
          );
        },
      });

      // Lift on mobile tap
      const handleTouchStart = () => {
        gsap.to(card, {
          y: -4,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleTouchEnd = () => {
        gsap.to(card, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      card.addEventListener("touchstart", handleTouchStart, { passive: true });
      card.addEventListener("touchend", handleTouchEnd, { passive: true });
      card.addEventListener("touchcancel", handleTouchEnd, { passive: true });

      return () => {
        st.kill();
        card.removeEventListener("touchstart", handleTouchStart);
        card.removeEventListener("touchend", handleTouchEnd);
        card.removeEventListener("touchcancel", handleTouchEnd);
        gsap.killTweensOf(card);
      };
    }
  }, []);

  // Desktop 3D Tilt + Specular Glare (works on every single hover)
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPct = (x / rect.width - 0.5) * 2;
      const yPct = (y / rect.height - 0.5) * 2;

      const rotateX = -yPct * maxTilt;
      const rotateY = xPct * maxTilt;

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: "transform 0.08s ease-out",
      });

      if (glare) {
        const glareX = Math.round((x / rect.width) * 100);
        const glareY = Math.round((y / rect.height) * 100);
        setGlareStyle({
          opacity: 1,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 65%)`,
          transition: "opacity 0.15s ease",
        });
      }
    },
    [maxTilt, scale, perspective, glare]
  );

  const handlePointerLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    });

    if (glare) {
      setGlareStyle({
        opacity: 0,
        transition: "opacity 0.4s ease-out",
      });
    }
  }, [perspective, glare]);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative will-change-transform transform-gpu ${className}`}
      style={{
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {/* 3D Specular Light Glare Layer */}
      {glare && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] overflow-hidden"
          style={{
            ...glareStyle,
            mixBlendMode: "overlay",
          }}
        />
      )}
      {children}
    </div>
  );
}
