/**
 * Tuning parameters for GDG CSMU animated hero.
 * All defaults match sections 6-8 of the master specification.
 */

// Effect 1: Canvas Dot Grid + Mouse Glow
export const DOT_SPACING = 14;              // px between dot centres, both axes
export const DOT_BASE_RADIUS = 1;           // px, dot radius far from mouse
export const DOT_GLOW_RADIUS_BONUS = 1.2;   // px added at full glow, max radius 2.2
export const GLOW_RADIUS = 180;             // px, distance over which glow falls to zero
export const BASE_ALPHA = 0.08;             // dot opacity far from mouse
export const GLOW_ALPHA_BONUS = 0.7;        // added at full glow, max alpha 0.78
export const MOUSE_LERP = 0.15;             // smoothing factor (0.12 - 0.18)
export const TRAIL_FADE_ALPHA = 0.35;       // background fade fill alpha per frame
export const PIXEL_RATIO_CAP = 2;           // maximum devicePixelRatio for retina

// Effect 2: Dotted Chevrons
export const CHEVRON_PATTERN_SPACING = 6;   // unit tile spacing
export const CHEVRON_DOT_RADIUS = 1.5;      // circle radius inside pattern

// Left chevron colors
export const LEFT_CHEVRON_TOP = "#EA4335";    // Red
export const LEFT_CHEVRON_BOTTOM = "#4285F4"; // Blue

// Right chevron colors
export const RIGHT_CHEVRON_TOP = "#34A853";   // Green
export const RIGHT_CHEVRON_BOTTOM = "#FBBC04";// Yellow

// Effect 3: Scroll-to-Open Split
export const HERO_SCROLL_HEIGHT = "200vh";  // outer wrapper scroll room
export const SCRUB = 1;                     // GSAP scrub smoothing in seconds
export const TITLE_TRAVEL = 120;            // xPercent magnitude for title halves
export const CHEVRON_TRAVEL = 180;          // xPercent magnitude for chevrons
export const META_FADE_END = 0.35;          // meta group fully faded by 35% of scroll
export const HERO_SCALE_TO = 0.96;          // inner hero scale down over scroll

