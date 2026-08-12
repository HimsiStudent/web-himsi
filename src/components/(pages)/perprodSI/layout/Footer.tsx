import Image from "next/image";
import Link from "next/link";
import { MandalaAccent } from "@/components/(pages)/perprodSI/ui/MandalaAccent";
import { assets } from "@/lib/perprodSI/assets";

const exploreLinks = [
  { href: "/perkenalan-prodi", label: "Beranda" },
  { href: "/perkenalan-prodi#timeline", label: "Timeline" },
  { href: "/perkenalan-prodi#divisions", label: "Divisi" },
  { href: "/perkenalan-prodi/faq", label: "FAQ" },
  { href: "/perkenalan-prodi/rules", label: "Peraturan" },
];

const glyph = "h-4 w-4" as const;

/** Contact channels — hrefs are placeholders until panitia supplies the real links. */
const contactLinks = [
  {
    label: "@perkenalanprodi.si",
    href: "https://www.instagram.com/perkenalanprodi.si",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={glyph}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "perprodsi@gmail.com",
    href: "mailto:perprodsi@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={glyph}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-maroon to-brown-deep text-linen">
      {/* Layered hills carry the page into the footer, so the seam is a ridge
          line rather than a hard colour edge. The art is bottom-anchored, so
          it is flipped to sit as the footer's top lip. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 -translate-y-px"
      >
        <Image
          src={assets.wave}
          alt=""
          width={2048}
          height={2048}
          sizes="100vw"
          className="h-[clamp(60px,9vw,140px)] w-full origin-center rotate-180 object-cover object-top"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url(${assets.temple})`,
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "min(480px, 60%) auto",
        }}
      />

      {/* These three are near-white artwork — invisible on the site's cream,
          and the maroon here is the only ground they read against. */}
      <MandalaAccent
        src={assets.mandala.rosetteGold}
        opacity={0.12}
        className="-left-24 bottom-[-18%] w-[380px] md:w-[460px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[240px] opacity-[0.13] lg:block"
      >
        <Image
          src={assets.wayang.orangRight}
          alt=""
          width={1080}
          height={1920}
          sizes="240px"
          className="h-full w-full object-cover object-right"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.22]"
        style={{
          backgroundImage: `url(${assets.sparkle})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[72rem] px-[var(--spacing-site-x)] py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/perkenalan-prodi" className="flex items-center gap-2.5">
              <Image
                src={assets.logo.main}
                alt=""
                width={80}
                height={80}
                className="h-10 w-10 object-contain"
              />
              <span className="font-serif text-base font-semibold uppercase tracking-[0.2em] text-linen">
                Navajivana
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-linen/70">
              Beginning Anew — Becoming Starts Now. Perkenalan Program Studi
              Sistem Informasi 2026.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-light">
              Jelajahi
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-linen/75 transition-colors duration-[var(--motion-fast)] ease-[var(--ease-sacred)] hover:text-linen"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-light">
              Kontak
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {contactLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2.5 text-sm text-linen/75 transition-colors duration-[var(--motion-fast)] ease-[var(--ease-sacred)] hover:text-linen"
                  >
                    <span className="text-amber-light/80">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing flourish — the wordmark appears once, at the very end. */}
        <div className="mt-16 flex justify-center">
          <Image
            src={assets.logo.wordmark}
            alt="Navajivana 2026"
            width={1000}
            height={500}
            sizes="(max-width: 640px) 70vw, 340px"
            className="h-auto w-[clamp(190px,45vw,340px)]"
          />
        </div>

        <div className="mt-14 flex flex-col-reverse items-center gap-4 border-t border-linen/15 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-linen/55">
            © 2026 Navajivana — Panitia Perkenalan Program Studi Sistem
            Informasi.
          </p>
          <a
            href="#main"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-linen/70 transition-colors hover:text-linen"
          >
            Kembali ke Atas
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
