"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { Modal } from "@/components/(pages)/perprodSI/ui/Modal";
import type { RealmContent } from "@/lib/perprodSI/realms";

/**
 * One realm, presented as a card that opens a modal rather than expanding in
 * place — the grid keeps its rhythm and the detail gets the whole viewport's
 * attention instead of a cramped column. Each realm carries its own colour via
 * the `--realm` custom property, so atmosphere (glow, well, ring) is unique per
 * element and travels with it into the dialog.
 */
export function RealmCard({ realm }: { realm: RealmContent }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const style = {
    "--realm": realm.color,
    "--realm-ink": `color-mix(in srgb, ${realm.color} 55%, var(--color-navy))`,
  } as React.CSSProperties;

  return (
    <>
      <div
        style={style}
        data-open={open}
        className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-cream transition-transform duration-[var(--motion-fast)] ease-[var(--ease-sacred)] hover:-translate-y-1.5 data-[open=true]:-translate-y-1.5"
      >
        <Atmosphere open={open} />

        <h3 className="relative z-10 m-0 flex-1">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex h-full w-full flex-col items-center gap-4 px-7 pt-9 pb-8 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--realm-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <Emblem realm={realm} size="h-28 w-28" />

            <span className="flex flex-col items-center gap-1">
              <span
                className="text-[0.65rem] font-semibold uppercase tracking-[0.35em]"
                style={{ color: "var(--realm-ink)" }}
              >
                {realm.element}
              </span>
              <span className="font-serif text-2xl font-semibold text-navy">
                {realm.name}
              </span>
            </span>

            <span className="text-sm italic text-navy/65">{realm.tagline}</span>

            <span
              className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.7rem] font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--realm-ink)" }}
            >
              Telusuri
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 transition-transform duration-[var(--motion-fast)] ease-[var(--ease-sacred)] group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>
        </h3>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        labelledBy={titleId}
        style={style}
        className="max-w-lg"
      >
        <Atmosphere open />

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={`Tutup detail divisi ${realm.name}`}
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-cream/70 text-navy/70 backdrop-blur-sm transition-colors duration-[var(--motion-fast)] hover:bg-cream hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--realm-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="relative z-10 px-7 pb-9 pt-10 sm:px-9">
          <div className="flex flex-col items-center gap-4 text-center">
            <Emblem realm={realm} size="h-32 w-32" />

            <div className="flex flex-col items-center gap-1">
              <p
                className="text-[0.65rem] font-semibold uppercase tracking-[0.35em]"
                style={{ color: "var(--realm-ink)" }}
              >
                {realm.element}
              </p>
              <p
                id={titleId}
                className="font-serif text-3xl font-semibold text-navy"
              >
                {realm.name}
              </p>
            </div>

            <p className="text-sm italic text-navy/65">{realm.tagline}</p>
          </div>

          <span
            aria-hidden
            className="my-7 block h-px w-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, transparent, color-mix(in srgb, var(--realm) 55%, transparent), transparent)",
            }}
          />

          <div className="space-y-5 text-left">
            <p className="text-sm leading-relaxed text-navy/75">
              {realm.description}
            </p>

            <Detail label="Simbolisme" color="var(--realm-ink)">
              {realm.symbolism}
            </Detail>

            <Detail
              label="Peran Divisi"
              color="var(--realm-ink)"
              tag={realm.roleTag}
            >
              {realm.role}
            </Detail>
          </div>
        </div>
      </Modal>
    </>
  );
}

/** Radial wash + ring tinted by `--realm`; intensifies on hover/open. */
function Atmosphere({ open }: { open: boolean }) {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 50% -10%, color-mix(in srgb, var(--realm) 18%, transparent), transparent 62%)",
        }}
      />
      <span
        aria-hidden
        data-open={open}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-[var(--motion-base)] group-hover:opacity-100 data-[open=true]:opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 50% -10%, color-mix(in srgb, var(--realm) 30%, transparent), transparent 66%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] border"
        style={{
          borderColor: "color-mix(in srgb, var(--realm) 38%, transparent)",
        }}
      />
    </>
  );
}

/** Emblem in a tinted well, so pale emblems keep contrast against cream. */
function Emblem({ realm, size }: { realm: RealmContent; size: string }) {
  return (
    <span
      className={`relative grid ${size} place-items-center rounded-full`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 38%, color-mix(in srgb, var(--realm) 32%, var(--color-cream)), color-mix(in srgb, var(--realm) 12%, var(--color-cream)))",
        boxShadow:
          "inset 0 0 0 1px color-mix(in srgb, var(--realm) 45%, transparent)",
      }}
    >
      <Image
        src={realm.emblem}
        alt={`Lambang ${realm.name}`}
        width={1000}
        height={1000}
        sizes="128px"
        className="h-[80%] w-[80%] object-contain drop-shadow-[0_6px_14px_rgba(36,55,74,0.18)]"
      />
    </span>
  );
}

function Detail({
  label,
  color,
  tag,
  children,
}: {
  label: string;
  color: string;
  tag?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <p
          className="text-[0.65rem] font-semibold uppercase tracking-[0.28em]"
          style={{ color }}
        >
          {label}
        </p>
        {tag ? (
          <span
            className="rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.15em]"
            style={{
              color,
              backgroundColor:
                "color-mix(in srgb, var(--realm) 18%, transparent)",
            }}
          >
            {tag}
          </span>
        ) : null}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-navy/70">{children}</p>
    </div>
  );
}
