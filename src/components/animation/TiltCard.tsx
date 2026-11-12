"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;      // degrees, default 12
  scale?: number;        // scale on hover/press, default 1.03
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
  const isPointerDownRef = useRef(false);
  const touchReleaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll reveal lift for mobile & desktop
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            card,
            { y: 16, opacity: 0.8 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" }
          );
          observer.unobserve(card);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(card);
    };
  }, []);

  // Update 3D Tilt calculation & Specular Glass Glare
  const applyTilt = useCallback(
    (clientX: number, clientY: number, isPressed = false) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Normalized percentage from center (-1 to +1)
      const xPct = Math.max(-1, Math.min(1, (x / rect.width - 0.5) * 2));
      const yPct = Math.max(-1, Math.min(1, (y / rect.height - 0.5) * 2));

      // 3D rotation angles
      const rotateX = -yPct * maxTilt;
      const rotateY = xPct * maxTilt;
      const currentScale = isPressed ? scale * 1.015 : scale;

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${currentScale}, ${currentScale}, ${currentScale})`,
        transition: isPressed ? "transform 0.1s ease-out" : "transform 0.08s ease-out",
      });

      if (glare) {
        const glareX = Math.round(Math.max(0, Math.min(100, (x / rect.width) * 100)));
        const glareY = Math.round(Math.max(0, Math.min(100, (y / rect.height) * 100)));
        setGlareStyle({
          opacity: isPressed ? 1 : 0.85,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.12) 35%, rgba(255, 255, 255, 0) 75%)`,
          transition: "opacity 0.12s ease",
        });
      }
    },
    [maxTilt, scale, perspective, glare]
  );

  // Smooth reset back to rest position
  const resetTilt = useCallback(
    (delayMs = 0) => {
      if (touchReleaseTimeoutRef.current) {
        clearTimeout(touchReleaseTimeoutRef.current);
      }

      const performReset = () => {
        setStyle({
          transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
          transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
        });

        if (glare) {
          setGlareStyle({
            opacity: 0,
            transition: "opacity 0.4s ease-out",
          });
        }
      };

      if (delayMs > 0) {
        touchReleaseTimeoutRef.current = setTimeout(performReset, delayMs);
      } else {
        performReset();
      }
    },
    [perspective, glare]
  );

  // Unified Pointer Handlers for BOTH Desktop Mouse and Mobile Touch
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      isPointerDownRef.current = true;
      if (touchReleaseTimeoutRef.current) {
        clearTimeout(touchReleaseTimeoutRef.current);
      }
      applyTilt(e.clientX, e.clientY, true);
    },
    [applyTilt]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Desktop mouse hover or active touch drag
      if (e.pointerType === "mouse" || isPointerDownRef.current) {
        applyTilt(e.clientX, e.clientY, isPointerDownRef.current);
      }
    },
    [applyTilt]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      isPointerDownRef.current = false;
      const isTouch = e.pointerType === "touch" || (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);
      // On mobile tap, hold the 3D tilt and specular reflection for 280ms so user clearly sees the 3D glass effect
      resetTilt(isTouch ? 280 : 0);
    },
    [resetTilt]
  );

  const handlePointerLeave = useCallback(() => {
    isPointerDownRef.current = false;
    resetTilt(0);
  }, [resetTilt]);

  const handlePointerCancel = useCallback(() => {
    isPointerDownRef.current = false;
    resetTilt(0);
  }, [resetTilt]);

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerCancel}
      className={`relative will-change-transform transform-gpu select-none touch-manipulation ${className}`}
      style={{
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {/* 3D Specular Light Glare Layer (Frosted Glass Reflection) */}
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
