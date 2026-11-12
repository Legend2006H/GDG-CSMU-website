"use client";

import React, { useId } from "react";
import {
  LEFT_CHEVRON_TOP,
  LEFT_CHEVRON_BOTTOM,
  RIGHT_CHEVRON_TOP,
  RIGHT_CHEVRON_BOTTOM,
} from "./heroConfig";

export function DottedChevron({
  side = "left",
  topColor,
  bottomColor,
  className = "",
  style = {},
  active = false,
  dimmed = false,
  onHoverStart,
  onHoverEnd,
}) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9-_]/g, "");

  const isLeft = side === "left";
  const defaultTop = isLeft ? LEFT_CHEVRON_TOP : RIGHT_CHEVRON_TOP;
  const defaultBottom = isLeft ? LEFT_CHEVRON_BOTTOM : RIGHT_CHEVRON_BOTTOM;

  const effectiveTopColor = topColor || defaultTop;
  const effectiveBottomColor = bottomColor || defaultBottom;

  const topPatternId = `hero-top-${side}-${uid}`;
  const bottomPatternId = `hero-bot-${side}-${uid}`;
  const shadowFilterId = `hero-sh-${side}-${uid}`;
  const topMaskId = `hero-mtop-${side}-${uid}`;
  const bottomMaskId = `hero-mbot-${side}-${uid}`;

  // Pill coordinates for Left (<) vs Right (>) in a 170x200 viewBox
  // Thickness: 48px stroke with rounded capsule linecaps
  // Left apex is at (42, 100); right apex is at (128, 100)
  const topX1 = isLeft ? 132 : 38;
  const topY1 = 38;
  const topX2 = isLeft ? 42 : 128;
  const topY2 = 100;

  const botX1 = isLeft ? 42 : 128;
  const botY1 = 100;
  const botX2 = isLeft ? 132 : 38;
  const botY2 = 162;

  const shadowDx = isLeft ? -2 : 2;

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onTouchStart={onHoverStart}
      className={`relative select-none pointer-events-auto cursor-pointer transition-all duration-300 ease-out flex-shrink-0 ${
        active ? "scale-105 brightness-125 opacity-100" : ""
      } ${dimmed ? "opacity-60 scale-95" : "opacity-100"} ${className}`}
      style={{
        width: "170px",
        height: "200px",
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 170 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block overflow-visible"
      >
        <defs>
          {/* 3D Depth Shadow between overlapping rounded capsule pills */}
          <filter id={shadowFilterId} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx={shadowDx}
              dy="3"
              stdDeviation="3"
              floodColor="#000000"
              floodOpacity="0.8"
            />
          </filter>

          {/* Top Pill Dot Pattern (5.5px diameter, 9.5px pitch) */}
          <pattern
            id={topPatternId}
            width="9.5"
            height="9.5"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="4.75" cy="4.75" r="2.75" fill={effectiveTopColor} />
          </pattern>

          {/* Bottom Pill Dot Pattern (5.5px diameter, 9.5px pitch) */}
          <pattern
            id={bottomPatternId}
            width="9.5"
            height="9.5"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="4.75" cy="4.75" r="2.75" fill={effectiveBottomColor} />
          </pattern>

          {/* Mask for Top Pill with rounded capsule ends */}
          <mask id={topMaskId}>
            <line
              x1={topX1}
              y1={topY1}
              x2={topX2}
              y2={topY2}
              stroke="white"
              strokeWidth="48"
              strokeLinecap="round"
            />
          </mask>

          {/* Mask for Bottom Pill with rounded capsule ends */}
          <mask id={bottomMaskId}>
            <line
              x1={botX1}
              y1={botY1}
              x2={botX2}
              y2={botY2}
              stroke="white"
              strokeWidth="48"
              strokeLinecap="round"
            />
          </mask>
        </defs>

        {/* Top Rounded Capsule Pill */}
        <g mask={`url(#${topMaskId})`}>
          <rect x="0" y="0" width="170" height="200" fill={`url(#${topPatternId})`} />
        </g>

        {/* Bottom Rounded Capsule Pill with shadow over top vertex */}
        <g mask={`url(#${bottomMaskId})`} filter={`url(#${shadowFilterId})`}>
          <rect x="0" y="0" width="170" height="200" fill={`url(#${bottomPatternId})`} />
        </g>
      </svg>
    </div>
  );
}

export default DottedChevron;
