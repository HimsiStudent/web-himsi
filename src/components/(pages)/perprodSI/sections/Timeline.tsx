import Image from "next/image";
import { CloudLayer, type CloudConfig } from "@/components/(pages)/perprodSI/ui/CloudLayer";
import { Container } from "@/components/(pages)/perprodSI/ui/Container";
import { RevealOnView } from "@/components/(pages)/perprodSI/ui/RevealOnView";
import { SectionHeading } from "@/components/(pages)/perprodSI/ui/SectionHeading";
import { SectionShell } from "@/components/(pages)/perprodSI/ui/SectionShell";
import { TimelineMilestone } from "@/components/(pages)/perprodSI/ui/TimelineMilestone";
import { TimelinePath } from "@/components/(pages)/perprodSI/ui/TimelinePath";
import { assets } from "@/lib/perprodSI/assets";
import { computedMilestones } from "@/lib/perprodSI/timeline";

/** Faint clouds drifting over the path — reflective, never loud. */
const clouds: CloudConfig[] = [
  {
    src: assets.clouds.outline[3],
    width: 1920,
    height: 1080,
    className: "left-[-8%] top-[10%] w-[32vw] max-w-[320px] opacity-30",
    duration: "27s",
    delay: "-5s",
  },
  {
    src: assets.clouds.outline[1],
    width: 1920,
    height: 1080,
    className: "right-[-8%] bottom-[8%] w-[34vw] max-w-[340px] opacity-25",
    duration: "24s",
    delay: "-1s",
  },
];

/** A small gold ketupat diamond marking where the path begins and ends. */
function PathTip({ position }: { position: "start" | "end" }) {
  return (
    <span
      aria-hidden
      className={[
        "absolute left-5 z-10 h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-[2px] border border-gold bg-cream md:left-1/2",
        position === "start" ? "-top-1" : "-bottom-1",
      ].join(" ")}
    />
  );
}

export function Timeline() {
  return (
    <SectionShell id="timeline" className="overflow-hidden bg-cream">
      {/* The centre wayang keeps watch over the path — "Penjaga: saksi dan
          pendamping di sepanjang perjalanan" from the Philosophy symbols.
          The source art is a flat white silhouette (invisible on cream), so
          it is inverted and warmed into the earth palette here. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 hidden w-[380px] -translate-x-1/2 opacity-[0.09] md:block lg:w-[460px]"
        style={{ filter: "invert(1) sepia(0.55) saturate(1.6) hue-rotate(345deg)" }}
      >
        <Image
          src={assets.wayang.center}
          alt=""
          width={1080}
          height={1920}
          sizes="460px"
          className="h-auto w-full"
        />
      </div>

      <CloudLayer clouds={clouds} className="z-0" />

      <Container>
        <RevealOnView>
          <SectionHeading
            kicker="Lini Masa"
            title="Perjalanan Navajivana"
            subtitle="Bukan sekadar jadwal, melainkan lima babak perjalanan — setiap langkah membawa kita lebih dekat pada jejak yang baru."
          />
        </RevealOnView>

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Animated scroll-driven path */}
          <TimelinePath />
          <PathTip position="start" />
          <PathTip position="end" />

          <ol className="relative">
            {computedMilestones.map((milestone, i) => (
              <TimelineMilestone
                key={milestone.ordinal}
                milestone={milestone}
                side={i % 2 === 0 ? "left" : "right"}
                index={i}
              />
            ))}
          </ol>
        </div>
      </Container>
    </SectionShell>
  );
}
