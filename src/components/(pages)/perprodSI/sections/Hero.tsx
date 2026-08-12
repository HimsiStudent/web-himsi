"use client";

import Image from "next/image";
import { BrandLogo } from "@/components/(pages)/perprodSI/layout/BrandLogo";
import { useHeroLogo } from "@/components/(pages)/perprodSI/layout/HeroLogoProvider";
import { CloudLayer, type CloudConfig } from "@/components/(pages)/perprodSI/ui/CloudLayer";
import { CloudPlate } from "@/components/(pages)/perprodSI/ui/CloudPlate";
import { CTAButton } from "@/components/(pages)/perprodSI/ui/CTAButton";
import { SectionShell } from "@/components/(pages)/perprodSI/ui/SectionShell";
import { assets } from "@/lib/perprodSI/assets";

const SOFT = 2380;
const OUTLINE_W = 1920;
const OUTLINE_H = 1080;

/** Clouds framing the logo — soft drift, varied depth + opacity. */
const heroClouds: CloudConfig[] = [
  {
    src: assets.clouds.soft[0],
    width: SOFT,
    height: SOFT,
    className: "left-[-8%] top-[6%] w-[44vw] max-w-[460px] opacity-80",
    duration: "17s",
    delay: "0s",
  },
  {
    src: assets.clouds.soft[1],
    width: SOFT,
    height: SOFT,
    className: "right-[-10%] top-[12%] w-[48vw] max-w-[520px] opacity-70",
    duration: "21s",
    delay: "-5s",
  },
  {
    src: assets.clouds.outline[0],
    width: OUTLINE_W,
    height: OUTLINE_H,
    className: "left-[4%] bottom-[14%] w-[40vw] max-w-[380px] opacity-50",
    duration: "24s",
    delay: "-9s",
  },
  {
    src: assets.clouds.outline[2],
    width: OUTLINE_W,
    height: OUTLINE_H,
    className: "right-[2%] bottom-[8%] w-[46vw] max-w-[420px] opacity-45",
    duration: "19s",
    delay: "-3s",
  },
];

export function Hero() {
  const { showInHero } = useHeroLogo();

  return (
    <SectionShell
      id="hero"
      full
      className="flex items-center justify-center overflow-hidden"
    >
      {/* Background plate */}
      <div aria-hidden className="absolute inset-0 -z-20">
        <Image
          src={assets.bg.color}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Atmosphere: veil the colour back so navy body copy keeps its contrast,
          soften the top, and ground the base into cream for a seamless seam. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-cream/70 via-cream/40 to-cream"
      />

      {/* Poster plate: its ink lives in the top 29%, so the window is cut to
          that band and anchored up. The hi-res variant goes here because the
          Hero is the one full-bleed surface where resolution shows. */}
      <CloudPlate
        src={assets.clouds.layer.full}
        className="inset-x-0 top-0 -z-10 aspect-[2048/860]"
        objectPosition="object-top"
        opacity={0.35}
      />

      {/* Drifting clouds */}
      <CloudLayer clouds={heroClouds} className="-z-10" />

      {/* Focal content */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-[var(--spacing-site-x)] py-24 text-center">
        {/* Fixed-size slot reserves the Hero's height regardless of whether
            the logo currently lives here or has morphed into the Header, so
            the section never jumps as it hands off. */}
        <div className="relative aspect-square w-[clamp(11rem,42vw,26rem)]">
          {showInHero ? (
            <BrandLogo
              alt="Navajivana 2026"
              priority
              rainbowOnHover
              withGlow
              sizes="(max-width: 768px) 60vw, 420px"
              className="drop-shadow-[0_24px_60px_rgba(36,55,74,0.18)]"
            />
          ) : null}
        </div>

        <p className="mt-10 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-earth-deep sm:text-xs">
          Navajivana 2026
        </p>

        <h1 className="mt-5 font-serif text-[clamp(2rem,6vw,4.25rem)] font-semibold leading-[1.08] text-navy">
          Beginning Anew
          {/* earth-deep, not earth: at the mobile clamp floor this line is 17px
              (normal text, needs 4.5:1) and the colour background costs enough
              contrast that plain earth fails AA there. */}
          <span className="mt-1 block text-[clamp(1.05rem,3vw,2rem)] font-normal italic text-earth-deep">
            Becoming Starts Now
          </span>
        </h1>

        <p className="mt-7 mx-auto max-w-[34rem] text-[clamp(1rem,2.4vw,1.4rem)] font-light leading-relaxed tracking-wide text-navy/80">
          Berani Melangkah, Hadirkan Jejak Baru
        </p>

        <div className="mt-11">
          <CTAButton href="#quick-access">Mulai Perjalanan</CTAButton>
        </div>
      </div>

      {/* Gentle scroll cue */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-2 text-earth/70"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.35em]">Gulir</span>
        <span
          className="block h-9 w-px bg-gradient-to-b from-earth/60 to-transparent"
          style={{
            animationName: "cloud-float",
            animationTimingFunction: "var(--ease-sacred)",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
            animationDuration: "3.5s",
          }}
        />
      </div>
    </SectionShell>
  );
}
