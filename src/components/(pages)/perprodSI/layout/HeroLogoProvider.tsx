"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type HeroLogoState = {
  /** Render the logo in the Hero (large, home page, unscrolled). */
  showInHero: boolean;
  /** Render the logo in the Header (small — either scrolled home, or any other page). */
  showInNav: boolean;
};

const HeroLogoContext = createContext<HeroLogoState>({
  showInHero: false,
  showInNav: true,
});

export function useHeroLogo() {
  return useContext(HeroLogoContext);
}

// Hysteresis band (not a single trip point) so a user parked right at the
// boundary doesn't flicker the morph back and forth.
const SCROLL_ENTER = 120;
const SCROLL_EXIT = 80;

/**
 * Single source of truth for where the brand logo currently "lives" — Hero
 * or Header. Both read the same state so exactly one of them ever mounts the
 * shared `layoutId="site-logo"` element, which is what makes the morph a true
 * single-element transition instead of a fade between two separate images.
 */
export function HeroLogoProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/perkenalan-prodi";
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(scrolled);
  scrolledRef.current = scrolled;

  useEffect(() => {
    if (!isHome) return;
    setScrolled(false);
    scrolledRef.current = false;

    const onScroll = () => {
      const y = window.scrollY;
      if (!scrolledRef.current && y > SCROLL_ENTER) {
        scrolledRef.current = true;
        setScrolled(true);
      } else if (scrolledRef.current && y < SCROLL_EXIT) {
        scrolledRef.current = false;
        setScrolled(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const value: HeroLogoState = isHome
    ? { showInHero: !scrolled, showInNav: scrolled }
    : { showInHero: false, showInNav: true };

  return <HeroLogoContext.Provider value={value}>{children}</HeroLogoContext.Provider>;
}
