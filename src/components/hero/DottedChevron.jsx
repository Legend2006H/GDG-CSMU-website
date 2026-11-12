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

  const topPatternId = `p-top-${side}-${uid}`;
  const bottomPatternId = `p-bottom-${side}-${uid}`;
  const ambientPatternId = `p-ambient-${side}-${uid}`;
  const shadowFilterId = `shadow-${side}-${uid}`;
  const topMaskId = `mask-top-${side}-${uid}`;
  const bottomMaskId = `mask-bottom-${side}-${uid}`;

  // Pill coordinates for Left (<) vs Right (>)
  // Thickness: 21 units with rounded capsule linecaps
  const topX1 = isLeft ? 70 : 30;
  const topY1 = 23;
  const topX2 = isLeft ? 33 : 67;
  const topY2 = 50;

  const botX1 = isLeft ? 33 : 67;
  const botY1 = 50;
  const botX2 = isLeft ? 70 : 30;
  const botY2 = 77;

  // Shadow offset direction: cast shadow downward away from apex
  const shadowDx = isLeft ? -1.5 : 1.5;

  return (
    <svg
      viewBox="16 11 68 78"
      aria-hidden="true"
      focusable="false"
      className={`h-[clamp(64px,14vw,90px)] sm:h-[clamp(80px,14vw,120px)] md:h-[clamp(110px,14vw,150px)] lg:h-[clamp(130px,13vw,170px)] w-auto flex-shrink-0 select-none pointer-events-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* 3D Depth Shadow between overlapping rounded capsule pills */}
        <filter id={shadowFilterId} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx={shadowDx}
            dy="2.5"
            stdDeviation="2"
            floodColor="#000000"
            floodOpacity="0.85"
          />
        </filter>

        {/* Top Pill Dot Pattern (Red for <, Green for >) */}
        <pattern
          id={topPatternId}
          width={CHEVRON_PATTERN_SPACING}
          height={CHEVRON_PATTERN_SPACING}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={CHEVRON_PATTERN_SPACING / 2}
            cy={CHEVRON_PATTERN_SPACING / 2}
            r={CHEVRON_DOT_RADIUS + 0.35}
            fill={effectiveTopColor}
          />
        </pattern>

        {/* Bottom Pill Dot Pattern (Blue for <, Yellow for >) */}
        <pattern
          id={bottomPatternId}
          width={CHEVRON_PATTERN_SPACING}
          height={CHEVRON_PATTERN_SPACING}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={CHEVRON_PATTERN_SPACING / 2}
            cy={CHEVRON_PATTERN_SPACING / 2}
            r={CHEVRON_DOT_RADIUS + 0.35}
            fill={effectiveBottomColor}
          />
        </pattern>

        {/* Ambient surrounding dots for authentic 3D halftone raster feel */}
        <pattern
          id={ambientPatternId}
          width={CHEVRON_PATTERN_SPACING}
          height={CHEVRON_PATTERN_SPACING}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={CHEVRON_PATTERN_SPACING / 2}
            cy={CHEVRON_PATTERN_SPACING / 2}
            r={CHEVRON_DOT_RADIUS * 0.55}
            className="chevron-ambient-dot"
          />
        </pattern>

        {/* Mask for Top Pill with rounded capsule ends */}
        <mask id={topMaskId}>
          <line
            x1={topX1}
            y1={topY1}
            x2={topX2}
            y2={topY2}
            stroke="white"
            strokeWidth="21"
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
            strokeWidth="21"
            strokeLinecap="round"
          />
        </mask>
      </defs>

      {/* Surrounding ambient halftone dot matrix */}
      <rect x="6" y="6" width="88" height="88" fill={`url(#${ambientPatternId})`} />

      {/* Underlayer: Top Rounded Capsule Pill */}
      <g mask={`url(#${topMaskId})`}>
        <rect x="0" y="0" width="100" height="100" fill={`url(#${topPatternId})`} />
      </g>

      {/* Overlayer: Bottom Rounded Capsule Pill with 3D Depth Shadow */}
      <g filter={`url(#${shadowFilterId})`}>
        <g mask={`url(#${bottomMaskId})`}>
          <rect x="0" y="0" width="100" height="100" fill={`url(#${bottomPatternId})`} />
        </g>
      </g>
    </svg>
  );
}

export default DottedChevron;
