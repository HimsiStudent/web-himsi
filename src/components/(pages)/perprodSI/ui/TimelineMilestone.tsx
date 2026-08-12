import Image from "next/image";
import { RevealOnView } from "@/components/(pages)/perprodSI/ui/RevealOnView";
import type { Milestone } from "@/lib/perprodSI/timeline";
import { cn } from "@/lib/perprodSI/utils";

const statusLabel: Record<Milestone["status"], string> = {
  done: "Telah dilalui",
  active: "Sedang berlangsung",
  soon: "Segera",
  upcoming: "Akan datang",
};

/** A node sitting on the path — its fill encodes journey progression. */
function Node({ ordinal, status }: { ordinal: string; status: Milestone["status"] }) {
  return (
    <span
      aria-hidden
      className="absolute left-0 top-0 z-10 grid h-10 w-10 place-items-center md:left-1/2 md:-translate-x-1/2"
    >
      {/* Soft glow for the chapter currently underway */}
      {status === "active" ? (
        <span className="absolute inset-0 rounded-full blur-md" style={{ backgroundColor: "rgba(241,199,81,0.45)" }} />
      ) : null}
      {/* Warm anticipation glow for H-2 — soon */}
      {status === "soon" ? (
        <span className="absolute inset-0 rounded-full blur-md" style={{ backgroundColor: "rgba(245,227,173,0.6)" }} />
      ) : null}
      <span
        className={cn(
          "relative grid h-10 w-10 place-items-center rounded-full font-serif text-sm transition-colors",
          // done — terisi penuh
          status === "done" &&
          "border border-gold bg-gold text-navy shadow-[0_4px_12px_-4px_rgba(215,185,122,0.8)]",
          // active — border gold, teks gold
          status === "active" &&
          "border-2 bg-cream shadow-[0_0_0_4px_rgba(241,199,81,0.18)]",
          // soon — border
          status === "soon" &&
          "border-2 bg-cream shadow-[0_0_0_4px_rgba(245,227,173,0.5)]",
          // upcoming — border faint
          status === "upcoming" && "border border-gold/40 bg-cream text-navy/70",
        )}
        style={
          status === "active"
            ? { borderColor: "#F1C751" }
            : status === "soon"
              ? { borderColor: "#F5E3AD" }
              : undefined
        }
      >
        {ordinal}
      </span>
    </span>
  );
}

export function TimelineMilestone({
  milestone,
  side,
  index,
}: {
  milestone: Milestone;
  side: "left" | "right";
  index: number;
}) {
  const { ordinal, phase, when, description, status, image } = milestone;
  const label = statusLabel[status];

  return (
    <li className="relative pb-12 last:pb-0 md:grid md:grid-cols-2 md:gap-x-16">
      <Node ordinal={ordinal} status={status} />

      {/* Decorative image on the opposite (empty) column */}
      {image && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none hidden items-end justify-center md:flex",
            side === "left"
              ? "md:col-start-2 md:row-start-1"
              : "md:col-start-1 md:row-start-1",
          )}
        >
          <Image
            src={image}
            alt=""
            width={400}
            height={400}
            className="h-auto w-48 opacity-[0.18] lg:w-56"
          />
        </div>
      )}

      <div
        className={cn(
          "pl-16 md:pl-0",
          side === "left"
            ? "md:col-start-1 md:row-start-1 md:pr-16 md:text-right"
            : "md:col-start-2 md:row-start-1 md:pl-16",
        )}
      >
        <RevealOnView delay={index * 0.08} amount={0.3}>
          <article
            className={cn(
              "rounded-2xl border px-6 py-5 backdrop-blur-[1px] transition-all duration-[var(--motion-fast)] ease-[var(--ease-sacred)]",
              // "soon" — card reversed: background #AA7971, teks cream
              status === "soon"
                ? "border-transparent hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_18px_42px_-24px_rgba(170,121,113,0.6)]"
                : "bg-cream/70 hover:-translate-y-1 hover:bg-cream hover:shadow-[0_18px_42px_-24px_rgba(139,109,83,0.45)]",
              status === "active" && "border-transparent",
              status === "soon" && "border-transparent",
              status !== "active" && status !== "soon" && "border-gold/20",
            )}
            style={
              status === "active"
                ? {
                  border: "1.5px solid #F1C751",
                  boxShadow: "0 0 0 3px rgba(241,199,81,0.18), 0 8px 32px -8px rgba(241,199,81,0.35)",
                }
                : status === "soon"
                  ? {
                    border: "1.5px solid #F5E3AD",
                    boxShadow: "0 0 0 3px rgba(245,227,173,0.45), 0 8px 32px -8px rgba(245,227,173,0.7)",
                  }
                  : undefined
            }
          >
            <div
              className={cn(
                "flex items-center gap-2",
                side === "left" ? "md:justify-end" : "md:justify-start",
              )}
            >
              {/* "when" label — cream jika soon, earth-deep jika lainnya */}
              <span
                className={cn(
                  "text-[0.65rem] font-semibold uppercase tracking-[0.28em]",
                  "text-earth-deep",
                )}
              >
                {when}
              </span>
              {label ? (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.12em]",
                    status === "active"
                      ? "bg-[#F1C751]/20 text-[#B78B10]"
                      : status === "soon"
                        ? "bg-[#F5E3AD]/40 text-[#8A6A00]"
                        : "bg-earth/10 text-earth-deep/80",
                  )}
                >
                  {label}
                </span>
              ) : null}
            </div>

            {/* Title — cream jika soon */}
            <h3
              className={cn(
                "mt-2 font-serif text-xl font-semibold",
                "text-navy",
              )}
            >
              {phase}
            </h3>
            {/* Body — cream/70 jika soon */}
            <p
              className={cn(
                "mt-2 text-sm leading-relaxed",
                "text-navy/70",
              )}
            >
              {description}
            </p>
          </article>
        </RevealOnView>
      </div>
    </li>
  );
}
