import Image from "next/image";
import { CloudLayer, type CloudConfig } from "@/components/(pages)/perprodSI/ui/CloudLayer";
import { CloudPlate } from "@/components/(pages)/perprodSI/ui/CloudPlate";
import { Container } from "@/components/(pages)/perprodSI/ui/Container";
import { Medallion } from "@/components/(pages)/perprodSI/ui/Medallion";
import { RevealOnView } from "@/components/(pages)/perprodSI/ui/RevealOnView";
import { SectionHeading } from "@/components/(pages)/perprodSI/ui/SectionHeading";
import { SectionShell } from "@/components/(pages)/perprodSI/ui/SectionShell";
import { SymbolOrbit, type OrbitCallout } from "@/components/(pages)/perprodSI/ui/SymbolOrbit";
import { assets } from "@/lib/perprodSI/assets";

const glyph = "h-5 w-5";

/**
 * Only the three symbols actually drawn inside the logo. Candi and Wayang are
 * carried by the prose above instead — a leader line pointing at a part the
 * artwork does not contain reads as a bug, not a metaphor.
 *
 * `target` is where the line lands, in logo space (0–1, 0 = top-left).
 */
const symbols: (OrbitCallout & { icon: React.ReactNode })[] = [
  {
    name: "Pohon",
    meaning: "Pertumbuhan — akar yang dalam, dahan yang terus meninggi.",
    target: { x: 0.62, y: 0.45 },
    side: "right",
    at: 0.47,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={glyph}
      >
        <circle cx="12" cy="9" r="5.5" />
        <path d="M12 14.5V21" />
        <path d="M9.5 18.5 12 16.5l2.5 2" />
      </svg>
    ),
  },
  {
    name: "Air",
    meaning: "Perjalanan — mengalir, menemukan jalan, tak pernah berhenti.",
    target: { x: 0.28, y: 0.72 },
    side: "left",
    at: 0.66,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={glyph}
      >
        <path d="M3 7c2 0 2 1.8 4.5 1.8S10 7 12 7s2 1.8 4.5 1.8S19 7 21 7" />
        <path d="M3 12c2 0 2 1.8 4.5 1.8S10 12 12 12s2 1.8 4.5 1.8S19 12 21 12" />
        <path d="M3 17c2 0 2 1.8 4.5 1.8S10 17 12 17s2 1.8 4.5 1.8S19 17 21 17" />
      </svg>
    ),
  },
  {
    name: "Awan",
    meaning: "Transisi — babak yang berganti, langit yang membuka diri.",
    target: { x: 0.3, y: 0.3 },
    side: "left",
    at: 0.32,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={glyph}
      >
        <path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.3A3.5 3.5 0 0 1 17 18z" />
      </svg>
    ),
  },
];

/** A single drifting cloud for atmosphere — kept faint so text stays readable. */
const clouds: CloudConfig[] = [
  {
    src: assets.clouds.outline[0],
    width: 1920,
    height: 1080,
    className: "right-[-6%] top-[4%] w-[34vw] max-w-[340px] opacity-35",
    duration: "25s",
    delay: "-4s",
  },
];

export function Philosophy() {
  return (
    <SectionShell
      id="philosophy"
      className="overflow-hidden bg-gradient-to-b from-cream via-ivory/50 to-cream"
    >
      {/* Faint meru-temple watermark — sacred backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[60vw] max-w-[460px] -translate-x-1/2 opacity-[0.06]"
      >
        <Image
          src={assets.temple}
          alt=""
          width={1080}
          height={1920}
          sizes="60vw"
          className="h-auto w-full"
        />
      </div>

      {/* This plate is 53% ink — the densest of the set — so it stays narrow
          and very faint, hugging the left edge its art was drawn against. */}
      <CloudPlate
        src={assets.clouds.layer.left}
        className="left-0 top-1/2 z-0 hidden w-[26vw] max-w-[300px] -translate-y-1/2 aspect-[1080/1350] lg:block"
        objectPosition="object-left"
        opacity={0.16}
      />

      <CloudLayer clouds={clouds} className="z-0" />

      <Container>
        <RevealOnView>
          <SectionHeading
            kicker="Apa itu Navajivana?"
            title="Makna di Balik Navajivana"
            subtitle="Sebuah pohon yang tumbuh dari air, di bawah langit yang berganti, melewati gerbang suci yang dijaga para wayang. Setiap simbol adalah satu bagian dari perjalanan menjadi."
          />
        </RevealOnView>

        {/* Radial callouts — desktop. Each line lands on the part of the logo it
            names, so the diagram stays truthful. */}
        <RevealOnView variant="softReveal" duration={1.2} amount={0.2}>
          <div className="mt-16">
            <SymbolOrbit
              src={assets.logo.main}
              alt="Lambang Navajivana — pohon yang tumbuh di antara ombak dan awan."
              callouts={symbols}
              ringSrc={assets.mandala.bloomCopper}
            />
          </div>
        </RevealOnView>

        {/* Below md the radial layout would collide with itself — stack instead. */}
        <div className="mt-12 md:hidden">
          <div className="relative mx-auto w-[68%] max-w-[280px] overflow-hidden rounded-full border border-gold/40 shadow-[0_24px_56px_-28px_rgba(36,55,74,0.55)]">
            <Image
              src={assets.logo.main}
              alt="Lambang Navajivana — pohon yang tumbuh di antara ombak dan awan."
              width={1024}
              height={1024}
              sizes="280px"
              className="h-full w-full object-cover"
            />
          </div>

          <ul className="mt-10 flex flex-col gap-6">
            {symbols.map((symbol, i) => (
              <li key={symbol.name}>
                <RevealOnView delay={0.1 + i * 0.08}>
                  <div className="flex items-center gap-5">
                    <Medallion size={56}>{symbol.icon}</Medallion>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-navy">
                        {symbol.name}
                      </h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-navy/70">
                        {symbol.meaning}
                      </p>
                    </div>
                  </div>
                </RevealOnView>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </SectionShell>
  );
}
