"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CloudPlate } from "@/components/(pages)/perprodSI/ui/CloudPlate";
import { Container } from "@/components/(pages)/perprodSI/ui/Container";
import { MandalaAccent } from "@/components/(pages)/perprodSI/ui/MandalaAccent";
import { RevealOnView } from "@/components/(pages)/perprodSI/ui/RevealOnView";
import { announcements, type AnnouncementItem } from "@/lib/perprodSI/announcements";
import { assets } from "@/lib/perprodSI/assets";
import { sacredEase } from "@/lib/perprodSI/motion";
import { cn } from "@/lib/perprodSI/utils";

const iconMap: Record<string, React.ReactNode> = {
  lokasi: (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <circle cx="20" cy="16" r="4.5" stroke="currentColor" strokeWidth={1.2} />
      <path
        d="M20 3C13.4 3 8 8.15 8 14.4c0 8.4 12 22.6 12 22.6s12-14.2 12-22.6C32 8.15 26.6 3 20 3z"
        stroke="currentColor"
        strokeWidth={1.2}
      />
    </svg>
  ),
  pengumpulan: (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <path
        d="M24 4H12a3 3 0 0 0-3 3v26a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V11l-7-7z"
        stroke="currentColor"
        strokeWidth={1.2}
      />
      <path d="M24 4v7h7" stroke="currentColor" strokeWidth={1.2} />
      <line x1="14" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth={1.2} />
      <line x1="14" y1="23" x2="26" y2="23" stroke="currentColor" strokeWidth={1.2} />
      <line x1="14" y1="28" x2="21" y2="28" stroke="currentColor" strokeWidth={1.2} />
    </svg>
  ),
  Atribut: (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <path
        d="M26 5h-3.5a2.5 2.5 0 0 1-5 0H14L6 12l4.5 3V35h19V15L34 12l-8-7z"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
    </svg>
  ),
  jadwal: (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9">
      <rect x="6" y="8" width="28" height="26" rx="3" stroke="currentColor" strokeWidth={1.2} />
      <line x1="6" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth={1.2} />
      <line x1="14" y1="5" x2="14" y2="11" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <line x1="26" y1="5" x2="26" y2="11" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
      <circle cx="20" cy="25" r="2" stroke="currentColor" strokeWidth={1.2} />
      <line x1="20" y1="23" x2="20" y2="21" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  Expandable card                                                    */
/* ------------------------------------------------------------------ */

function AnnouncementCard({
  item,
  index,
}: {
  item: AnnouncementItem;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "group relative rounded-2xl bg-white/80 shadow-[0_2px_24px_-4px_rgba(36,55,74,0.07)] backdrop-blur-sm transition-shadow duration-300 ease-out hover:shadow-[0_8px_40px_-8px_rgba(36,55,74,0.12)]",
        "border border-white/60",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-5 px-7 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 sm:gap-6 sm:px-8 sm:py-7"
      >
        {/* Icon */}
        <span className="shrink-0 text-navy/40 transition-colors duration-200 group-hover:text-navy/60">
          {iconMap[item.id] ?? iconMap.lokasi}
        </span>

        {/* Title + summary */}
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="font-serif text-[1.05rem] font-semibold leading-snug text-navy sm:text-[1.15rem]">
            {item.title}
          </h3>
          <p className="mt-1 text-[0.82rem] leading-relaxed text-navy/45">
            {item.summary}
          </p>
        </div>

        {/* Chevron */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "h-5 w-5 shrink-0 text-navy/30 transition-transform duration-300 ease-out",
            open && "rotate-180",
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Expandable body */}
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{
          height: { duration: reduce ? 0.01 : 0.4, ease: sacredEase },
          opacity: { duration: reduce ? 0.01 : 0.25, ease: sacredEase },
        }}
        className="overflow-hidden"
      >
        <div className="border-t border-navy/[0.06] px-7 pb-7 pt-5 sm:px-8 sm:pb-8 sm:pt-6">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5">
            {item.details.map((d) => {
              const isLong = d.value.length > 70;
              return (
                <div
                  key={d.label}
                  className={cn(
                    "flex flex-col gap-1",
                    isLong ? "sm:col-span-2" : ""
                  )}
                >
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-navy/35">
                    {d.label}
                  </dt>
                  <dd className="m-0 max-w-none text-justify text-[0.9rem] leading-[1.65] text-navy/75">
                    {d.value}
                  </dd>
                </div>
              );
            })}
          </dl>

          {item.note && (
            <p className="mt-5 rounded-lg bg-navy/[0.03] px-4 py-3 text-[0.82rem] leading-[1.7] text-navy/50">
              <span className="mr-1.5 text-gold">●</span>
              {item.note}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                      */
/* ------------------------------------------------------------------ */

export function Announcements() {
  return (
    <section
      id="announcements"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-cream via-ivory/40 to-cream"
    >
      {/* Ink fills the lower 39% of this plate — window cut to that, anchored
          down, so the page closes on a bank of cloud. */}
      <CloudPlate
        src={assets.clouds.layer.bottom}
        className="inset-x-0 bottom-0 z-0 aspect-[1080/560]"
        objectPosition="object-bottom"
        opacity={0.3}
      />

      <MandalaAccent
        src={assets.mandala.bloomLight}
        opacity={0.15}
        className="-right-32 top-[14%] hidden w-[420px] lg:block"
      />

      {/* Oriental cloud ornaments — corners */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={assets.clouds.outline[0]}
          alt=""
          width={1920}
          height={1080}
          className="absolute -left-[8%] -top-[4%] w-[28vw] max-w-[320px] opacity-[0.08]"
        />
        <Image
          src={assets.clouds.outline[2]}
          alt=""
          width={1920}
          height={1080}
          className="absolute -right-[6%] top-[8%] w-[24vw] max-w-[280px] opacity-[0.06]"
        />
        <Image
          src={assets.clouds.outline[1]}
          alt=""
          width={1920}
          height={1080}
          className="absolute -left-[5%] bottom-[5%] w-[22vw] max-w-[260px] opacity-[0.05]"
        />
        <Image
          src={assets.clouds.outline[3]}
          alt=""
          width={1920}
          height={1080}
          className="absolute -bottom-[3%] -right-[5%] w-[26vw] max-w-[300px] opacity-[0.07]"
        />
      </div>

      <Container className="relative z-10 pb-20 pt-16 sm:pb-28 sm:pt-24">
        {/* Hero — circular logo emblem */}
        <RevealOnView className="flex flex-col items-center">
          {/* Title */}
          <h1 className="mt-8 text-center font-serif text-[clamp(1.8rem,4.5vw,3rem)] font-semibold leading-[1.15] tracking-tight text-navy sm:mt-10">
            Pengumuman Kegiatan
          </h1>
          <p className="mt-4 max-w-[40ch] text-center text-[0.92rem] leading-[1.75] text-navy/45">
            Informasi penting seputar lokasi, penugasan, dan ketentuan pakaian
            untuk rangkaian Navajivana 2026.
          </p>

          {/* Thin ornamental divider */}
          <div className="mt-8 flex items-center gap-3 sm:mt-10">
            <span className="h-px w-10 bg-gold/30 sm:w-14" />
            <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-gold/40" />
            <span className="h-px w-10 bg-gold/30 sm:w-14" />
          </div>
        </RevealOnView>

        {/* Card list */}
        <div className="mx-auto mt-12 flex max-w-[44rem] flex-col gap-4 sm:mt-14 sm:gap-5">
          {announcements.map((item, i) => (
            <RevealOnView key={item.id} delay={i * 0.08} amount={0.2}>
              <AnnouncementCard item={item} index={i} />
            </RevealOnView>
          ))}
        </div>

        {/* Footer note */}
        <RevealOnView delay={0.3}>
          <p className="mx-auto mt-14 max-w-[44rem] text-center text-[0.82rem] leading-relaxed text-navy/30 sm:mt-16">
            Informasi dapat diperbarui sewaktu-waktu — pantau grup resmi untuk
            kabar terbaru.
          </p>
        </RevealOnView>
      </Container>
    </section>
  );
}
