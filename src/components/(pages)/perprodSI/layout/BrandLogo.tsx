"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { assets } from "@/lib/perprodSI/assets";
import { cn } from "@/lib/perprodSI/utils";

// A soft, critically-damped-ish spring — settles without any bounce/overshoot,
// which reads as "gentle" far more than a duration+easing tween does for a
// size+position morph this large (hero-sized down to a nav icon).
const softSpring = { type: "spring", stiffness: 110, damping: 22, mass: 1 } as const;

/**
 * The glow variant draws its tree at 74.6% of its frame; the plain mark draws
 * it at 95.9%. Scaling the glow up by that ratio lands the artwork at exactly
 * the same on-screen size, so the Hero→Header morph keeps the tree locked and
 * only the soft halo drops away — and the rainbow overlay, which shares the
 * plain mark's geometry, still registers with it.
 */
const GLOW_SCALE = 95.9 / 74.6;

/**
 * The one and only logo element. It mounts either inside the Hero (large) or
 * inside the Header (small) — see HeroLogoProvider — never both. Framer
 * Motion's layoutId tracks the DOM rect of whichever instance last existed
 * and animates the new one in from that rect, so the browser-computed
 * position/size/scale genuinely interpolate — no manual FLIP math, and no
 * second image fading in behind it.
 */
export function BrandLogo({
  alt,
  priority,
  sizes,
  className,
  rainbowOnHover = false,
  withGlow = false,
}: {
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
  /** Cross-fade to the rainbow line-art logo on hover (Hero only). */
  rainbowOnHover?: boolean;
  /** Use the haloed variant, which separates the mark from a coloured ground. */
  withGlow?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      layoutId="site-logo"
      transition={reduce ? { duration: 0.01 } : softSpring}
      className={cn("group relative h-full w-full", className)}
    >
      <Image
        src={withGlow ? assets.logo.glow : assets.logo.main}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={withGlow ? { scale: GLOW_SCALE } : undefined}
        className={cn(
          "object-contain",
          rainbowOnHover &&
            "transition-opacity duration-[var(--motion-fast)] ease-[var(--ease-sacred)] group-hover:opacity-0",
        )}
      />

      {/* The rainbow variant is line art with pale strokes — the drop shadow is
          what keeps it legible once it lands on the Hero's light background. */}
      {rainbowOnHover ? (
        <Image
          src={assets.logo.rainbow}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          className="pointer-events-none object-contain opacity-0 drop-shadow-[0_2px_12px_rgba(36,55,74,0.45)] transition-opacity duration-[var(--motion-fast)] ease-[var(--ease-sacred)] group-hover:opacity-100"
        />
      ) : null}
    </motion.div>
  );
}
