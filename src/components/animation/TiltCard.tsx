"use client";

import React, { useRef, useState, useCallback } from "react";

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

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Only execute on desktop fine pointer devices
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate normalized position -1 to 1
      const xPct = (x / rect.width - 0.5) * 2;
      const yPct = (y / rect.height - 0.5) * 2;

      const rotateX = -yPct * maxTilt;
      const rotateY = xPct * maxTilt;

      // Apply dynamic 3D transform instantaneously with zero tween conflict
      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: "transform 0.08s ease-out",
      });

      if (glare) {
        const glareX = Math.round((x / rect.width) * 100);
        const glareY = Math.round((y / rect.height) * 100);
        setGlareStyle({
          opacity: 1,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 65%)`,
          transition: "opacity 0.15s ease",
        });
      }
    },
    [maxTilt, scale, perspective, glare]
  );

  const handlePointerLeave = useCallback(() => {
    // Smooth release back to flat resting state on every mouse leave
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
