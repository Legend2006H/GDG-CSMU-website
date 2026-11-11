/**
 * Shared motion tokens for GDG CSMU 2026 animation system.
 * Based on the master animation specification.
 */

export const MOTION_TOKENS = {
  // Reveal ease & duration
  easeReveal: "expo.out",
  easeRevealCss: "cubic-bezier(0.16, 1, 0.3, 1)",
  durationReveal: 0.9, // 0.8 - 1.0s

  // UI & Micro-interactions
  easeUi: "power3.out",
  durationUi: 0.3,     // 200 - 400ms

  easeMicro: "power2.out",
  durationMicro: 0.18, // 100 - 200ms

  // Page curtain / transitions
  easePage: "power3.inOut",
  durationPage: 0.9,   // 0.8 - 1.25s

  // Staggers
  staggerCard: 0.08,
  staggerLine: 0.09,

  // Magnetic button physics
  magneticFollowScale: 0.3,
  magneticReleaseDuration: 1.0,
  magneticReleaseEase: "elastic.out(1, 0.3)",
};

