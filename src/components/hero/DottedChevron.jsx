"use client";

import React, { useId } from "react";
import {
  CHEVRON_PATTERN_SPACING,
  CHEVRON_DOT_RADIUS,
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
}) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9-_]/g, "");

  const isLeft = side === "left";
  const defaultTop = isLeft ? LEFT_CHEVRON_TOP : RIGHT_CHEVRON_TOP;
  const defaultBottom = isLeft ? LEFT_CHEVRON_BOTTOM : RIGHT_CHEVRON_BOTTOM;

  const effectiveTopColor = topColor || defaultTop;
  const effectiveBottomColor = bottomColor || defaultBottom;

  const patternId = `dots-${side}-${uid}`;
  const topClipId = `clip-top-${side}-${uid}`;
  const bottomClipId = `clip-bottom-${side}-${uid}`;

  // Canonical chevron path from Section 7
  const chevronPath = "M70 10 L30 50 L70 90 L55 90 L20 50 L55 10 Z";

  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={`h-[clamp(64px,18vw,120px)] md:h-[clamp(120px,22vw,260px)] w-auto flex-shrink-0 select-none pointer-events-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Single shared dot pattern for seamless dot alignment */}
        <pattern
          id={patternId}
          width={CHEVRON_PATTERN_SPACING}
          height={CHEVRON_PATTERN_SPACING}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={CHEVRON_PATTERN_SPACING / 2}
            cy={CHEVRON_PATTERN_SPACING / 2}
            r={CHEVRON_DOT_RADIUS}
            fill="currentColor"
          />
        </pattern>

        {/* Half-height clip rectangles */}
        <clipPath id={topClipId}>
          <rect x="0" y="0" width="100" height="50" />
        </clipPath>
        <clipPath id={bottomClipId}>
          <rect x="0" y="50" width="100" height="50" />
        </clipPath>
      </defs>

      {/* Content group: mirrored for right chevron via scale(-1, 1) translate(-100, 0) */}
      <g transform={isLeft ? undefined : "scale(-1, 1) translate(-100, 0)"}>
        {/* Top Half */}
        <g clipPath={`url(#${topClipId})`} style={{ color: effectiveTopColor }}>
          <path d={chevronPath} fill={`url(#${patternId})`} />
        </g>

        {/* Bottom Half */}
        <g clipPath={`url(#${bottomClipId})`} style={{ color: effectiveBottomColor }}>
          <path d={chevronPath} fill={`url(#${patternId})`} />
        </g>
      </g>
    </svg>
  );
}

export default DottedChevron;

