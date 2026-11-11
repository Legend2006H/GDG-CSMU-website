"use client";

import React from "react";

interface MarqueeStripProps {
  items?: string[];
  speed?: number; // duration in seconds
  direction?: "left" | "right";
  className?: string;
}

export function MarqueeStrip({
  items = [
    "GOOGLE DEVELOPER GROUPS",
    "ON CAMPUS CSMU",
    "LEARN • BUILD • CONNECT",
    "WEB • ANDROID • CLOUD • AI/ML",
    "749+ DEVELOPERS",
  ],
  speed = 28,
  direction = "left",
  className = "",
}: MarqueeStripProps) {
  const content = items.join("   ★   ");

  return (
    <div
      className={`relative w-full overflow-hidden py-3 border-y border-[var(--line)] bg-[var(--surface)] select-none ${className}`}
      aria-label="Community updates and tracks ticker"
    >
      <div
        className={`flex w-fit whitespace-nowrap font-mono text-xs font-semibold tracking-widest text-[var(--muted-bright)] ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        <span className="inline-block px-4">{content}   ★   </span>
        <span className="inline-block px-4" aria-hidden="true">{content}   ★   </span>
        <span className="inline-block px-4" aria-hidden="true">{content}   ★   </span>
        <span className="inline-block px-4" aria-hidden="true">{content}   ★   </span>
      </div>
    </div>
  );
}

