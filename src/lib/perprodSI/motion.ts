/**
 * Sacred motion primitives. Entrance variants live in RevealOnView (which also
 * handles prefers-reduced-motion); this module is the single source for the
 * shared easing curve and durations (600–1200ms per the motion system).
 */
export const sacredEase = [0.22, 1, 0.36, 1] as const;

export const motionDurations = {
  fast: 0.6,
  base: 0.9,
  slow: 1.2,
} as const;
