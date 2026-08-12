import { CloudLayer, type CloudConfig } from "@/components/(pages)/perprodSI/ui/CloudLayer";
import { CloudPlate } from "@/components/(pages)/perprodSI/ui/CloudPlate";
import { Container } from "@/components/(pages)/perprodSI/ui/Container";
import { DriftCollage } from "@/components/(pages)/perprodSI/ui/DriftCollage";
import { MandalaAccent } from "@/components/(pages)/perprodSI/ui/MandalaAccent";
import { QuickAccessCard } from "@/components/(pages)/perprodSI/ui/QuickAccessCard";
import { RevealOnView } from "@/components/(pages)/perprodSI/ui/RevealOnView";
import { SectionHeading } from "@/components/(pages)/perprodSI/ui/SectionHeading";
import { SectionShell } from "@/components/(pages)/perprodSI/ui/SectionShell";
import { assets } from "@/lib/perprodSI/assets";

const glyph =
  "h-7 w-7" as const;

const icons = {
  timeline: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={glyph}
    >
      <line x1="7" y1="3" x2="7" y2="21" />
      <circle cx="7" cy="6" r="1.6" />
      <circle cx="7" cy="12" r="1.6" />
      <circle cx="7" cy="18" r="1.6" />
      <line x1="11" y1="6" x2="18" y2="6" />
      <line x1="11" y1="12" x2="18" y2="12" />
      <line x1="11" y1="18" x2="16" y2="18" />
    </svg>
  ),
  faq: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={glyph}
    >
      <path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z" />
      <path d="M9.6 9.2a2.4 2.4 0 0 1 4.4 1.3c0 1.6-2 1.8-2 3" />
      <line x1="12" y1="15.4" x2="12" y2="15.5" />
    </svg>
  ),
  rules: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={glyph}
    >
      <path d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v4h4" />
      <line x1="8" y1="9.5" x2="11" y2="9.5" />
      <line x1="8" y1="13" x2="15" y2="13" />
      <line x1="8" y1="16.5" x2="15" y2="16.5" />
    </svg>
  ),
  announcement: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={glyph}
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  ),
};

const items = [
  {
    href: "#timeline",
    title: "Timeline",
    description:
      "Alur perjalanan Navajivana, dari langkah pertama hingga puncak acara.",
    icon: icons.timeline,
  },
  {
    href: "/perkenalan-prodi/faq",
    title: "FAQ",
    description:
      "Jawaban atas pertanyaan yang paling sering diajukan peserta.",
    icon: icons.faq,
  },
  {
    href: "/perkenalan-prodi/rules",
    title: "Peraturan",
    description:
      "Ketentuan dan tata tertib yang perlu dipahami sebelum melangkah.",
    icon: icons.rules,
  },
  {
    href: "/perkenalan-prodi/pengumuman",
    title: "Pengumuman",
    description: "Kabar dan informasi terbaru langsung dari panitia.",
    icon: icons.announcement,
  },
];

/** Faint clouds at the corners — continuity with the Hero, kept low-opacity. */
const clouds: CloudConfig[] = [
  {
    src: assets.clouds.outline[1],
    width: 1920,
    height: 1080,
    className: "left-[-7%] top-[-3%] w-[34vw] max-w-[340px] opacity-40",
    duration: "26s",
    delay: "-6s",
  },
  {
    src: assets.clouds.outline[3],
    width: 1920,
    height: 1080,
    className: "right-[-7%] bottom-[1%] w-[36vw] max-w-[360px] opacity-30",
    duration: "23s",
    delay: "-2s",
  },
];

export function QuickAccess() {
  return (
    <SectionShell id="quick-access" className="overflow-hidden bg-cream">
      {/* Ink sits in the upper 21% of this plate — window cut to match. */}
      <CloudPlate
        src={assets.clouds.layer.top}
        className="inset-x-0 top-0 z-0 aspect-[1080/300]"
        objectPosition="object-top"
        opacity={0.28}
      />

      <MandalaAccent
        src={assets.mandala.bloomPastel}
        opacity={0.13}
        className="-left-32 top-[8%] hidden w-[440px] lg:block"
      />

      {/* Documentation photographs drift behind the cards as atmosphere. They
          carry no meaning a reader needs, so the whole layer is hidden from
          assistive tech rather than announcing two dozen images in the middle
          of what is really a navigation block. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <DriftCollage backdrop />
      </div>

      <CloudLayer clouds={clouds} className="-z-0 opacity-70" />

      <Container>
        <RevealOnView>
          <SectionHeading
            kicker="Quick Access"
            title="Mulai dari Sini"
            subtitle="Empat informasi menuju hal yang paling sering dicari."
          />
        </RevealOnView>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <RevealOnView key={item.href} delay={i * 0.1} className="h-full">
              <QuickAccessCard {...item} />
            </RevealOnView>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
