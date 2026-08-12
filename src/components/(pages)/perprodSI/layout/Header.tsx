"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/(pages)/perprodSI/layout/BrandLogo";
import { useHeroLogo } from "@/components/(pages)/perprodSI/layout/HeroLogoProvider";
import { sacredEase } from "@/lib/perprodSI/motion";
import { cn } from "@/lib/perprodSI/utils";

/**
 * `section` is the homepage anchor a link points at. usePathname() never
 * includes the hash, so these can only be resolved by watching which section
 * is actually on screen — see useActiveSection.
 */
const navItems = [
  { href: "/perkenalan-prodi", label: "Beranda", section: null },
  { href: "/perkenalan-prodi#timeline", label: "Timeline", section: "timeline" },
  { href: "/perkenalan-prodi#divisions", label: "Divisi", section: "divisions" },
  { href: "/perkenalan-prodi/faq", label: "FAQ", section: null },
  { href: "/perkenalan-prodi/rules", label: "Peraturan", section: null },
] as const;

type SectionId = NonNullable<(typeof navItems)[number]["section"]>;

const spySections = navItems
  .map((item) => item.section)
  .filter((s): s is SectionId => s !== null);

/**
 * Reports which homepage section currently sits across the middle of the
 * viewport. The rootMargin collapses the observation area to a thin band at
 * the centre of the screen, so exactly one section is "current" at a time
 * instead of every section that happens to be partly visible.
 */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId | null>(null);
  const visible = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    const elements = spySections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const seen = visible.current;
    seen.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target.id);
          else seen.delete(entry.target.id);
        }
        // Document order wins when two sections straddle the band.
        setActive(spySections.find((id) => seen.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

/**
 * Global site chrome — sticky across every page (see layout.tsx) so Timeline/
 * FAQ/Peraturan are always one tap away instead of buried in homepage scroll.
 *
 * The brand mark (logo + wordmark) isn't owned by this component — it's
 * rendered by HeroLogoProvider's shared state, which decides whether the
 * logo currently lives here or in the Hero. See BrandLogo for the actual
 * shared-element (layoutId) morph.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { showInNav } = useHeroLogo();
  const reduce = useReducedMotion();

  const isHome = pathname === "/perkenalan-prodi";
  const activeSection = useActiveSection(isHome);

  // On the homepage the "current page" is really the current *section*, and
  // falls back to Beranda while the reader is still above the first anchor.
  const activeHref = isHome
    ? activeSection
      ? `/perkenalan-prodi#${activeSection}`
      : "/perkenalan-prodi"
    : pathname;

  // Reading progress, drawn along the header's bottom edge. Spring-smoothed so
  // it glides instead of stepping with every scroll event.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  // The panel lives inside this sticky header, so an open panel would
  // otherwise scroll-pin over the page content beneath it — lock scroll
  // while it's open, like a mobile nav overlay.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)]",
        showInNav
          ? "border-gold/20 bg-cream/85 shadow-[0_8px_24px_-18px_rgba(36,55,74,0.35)] backdrop-blur-md"
          : "border-transparent bg-transparent shadow-none backdrop-blur-0",
      )}
    >
      <div
        className={cn(
          // Deliberately *not* capped at the 72rem content measure: this is
          // site chrome, not prose. Constraining it left the logo and the nav
          // stranded in the middle of wide screens, so the bar now runs the
          // full width and the site's edge padding sets the inset.
          "mx-auto flex w-full items-center justify-between px-[var(--spacing-site-x)]",
          // Settles a little tighter once it is a solid bar rather than
          // floating chrome over the Hero.
          "transition-[padding] duration-[900ms] [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)]",
          showInNav ? "py-2.5 lg:py-3" : "py-4 lg:py-5",
        )}
      >
        <Link
          href="/perkenalan-prodi"
          aria-hidden={!showInNav}
          tabIndex={showInNav ? 0 : -1}
          className="flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          onClick={() => setOpen(false)}
        >
          {/* Grows only from lg up: at the md breakpoint the bar has barely
              20px of slack, so enlarging everywhere would push the nav into
              the wordmark on tablets. */}
          <div className="relative h-10 w-10 shrink-0 lg:h-12 lg:w-12">
            {showInNav ? (
              <BrandLogo alt="" sizes="(min-width: 1024px) 48px, 40px" />
            ) : null}
          </div>
          <AnimatePresence>
            {showInNav ? (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: reduce ? 0.01 : 0.55, delay: reduce ? 0 : 0.45, ease: "easeOut" },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: reduce ? 0.01 : 0.3, ease: "easeIn" },
                }}
                className="whitespace-nowrap text-[0.7rem] font-medium uppercase tracking-[0.4em] text-navy sm:text-xs lg:text-[0.8125rem]"
              >
                Navajivana 2026
              </motion.span>
            ) : null}
          </AnimatePresence>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => {
              const active = item.href === activeHref;
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative block py-1 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-[var(--motion-fast)] ease-[var(--ease-sacred)] lg:text-sm",
                      active ? "text-navy" : "text-navy/60 hover:text-navy",
                    )}
                  >
                    {item.label}

                    {/* Hover echo of the active ornament — appears under any
                        link the cursor is over, so the whole row responds. */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-[var(--motion-fast)] group-hover:opacity-100"
                    />
                  </Link>

                  {/* One shared ornament that slides between links rather than
                      fading out here and in again there. Same hairline the
                      section headings use, so the chrome speaks the site's
                      own visual language. */}
                  {active ? (
                    <motion.span
                      aria-hidden
                      layoutId="nav-active"
                      className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                      transition={
                        reduce
                          ? { duration: 0.01 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:hidden"
        >
          {/* Three bars that fold into a cross — an icon that animates rather
              than swapping between two glyphs. */}
          <span aria-hidden className="relative block h-4 w-5">
            {[
              { top: "0.125rem", closed: { y: 0, rotate: 0 }, opened: { y: 6, rotate: 45 } },
              { top: "0.5rem", closed: { opacity: 1 }, opened: { opacity: 0 } },
              { top: "0.875rem", closed: { y: 0, rotate: 0 }, opened: { y: -6, rotate: -45 } },
            ].map((bar, i) => (
              <motion.span
                key={i}
                className="absolute inset-x-0 block h-[1.6px] rounded-full bg-current"
                style={{ top: bar.top }}
                animate={open ? bar.opened : bar.closed}
                transition={reduce ? { duration: 0.01 } : { duration: 0.32, ease: sacredEase }}
              />
            ))}
          </span>
        </button>
      </div>

      {/* Reading progress — only once the bar is solid, so it never draws a
          stray line across the Hero. */}
      <motion.span
        aria-hidden
        style={{ scaleX: progress }}
        className={cn(
          "absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-opacity duration-[900ms]",
          showInNav ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Mobile nav panel */}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Navigasi utama (mobile)"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.45, ease: sacredEase }}
            className="overflow-hidden border-t border-gold/20 bg-cream/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col px-[var(--spacing-site-x)] py-3">
              {navItems.map((item, i) => {
                const active = item.href === activeHref;
                return (
                  <li key={item.href}>
                    <motion.div
                      initial={reduce ? { opacity: 0 } : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={
                        reduce
                          ? { duration: 0.01 }
                          : { duration: 0.4, ease: sacredEase, delay: 0.06 + i * 0.05 }
                      }
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 py-3 text-sm font-medium uppercase tracking-[0.18em] transition-colors",
                          active ? "text-navy" : "text-navy/70 hover:text-navy",
                        )}
                      >
                        {/* A small gold ketupat marks the current entry —
                            the same diamond the Timeline uses for its path. */}
                        <span
                          aria-hidden
                          className={cn(
                            "h-1.5 w-1.5 shrink-0 rotate-45 rounded-[1px] transition-all duration-[var(--motion-fast)]",
                            active ? "bg-gold opacity-100" : "bg-gold/0 opacity-0",
                          )}
                        />
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
