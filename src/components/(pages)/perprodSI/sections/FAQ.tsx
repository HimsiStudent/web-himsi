import Image from "next/image";
import { FAQTabs } from "@/components/(pages)/perprodSI/sections/FAQTabs";
import { CloudLayer, type CloudConfig } from "@/components/(pages)/perprodSI/ui/CloudLayer";
import { CloudPlate } from "@/components/(pages)/perprodSI/ui/CloudPlate";
import { Container } from "@/components/(pages)/perprodSI/ui/Container";
import { RevealOnView } from "@/components/(pages)/perprodSI/ui/RevealOnView";
import { SectionDivider } from "@/components/(pages)/perprodSI/ui/SectionDivider";
import { assets } from "@/lib/perprodSI/assets";
import { faqs } from "@/lib/perprodSI/faq";

const SOFT = 2380;
const OUTLINE_W = 1920;
const OUTLINE_H = 1080;

/**
 * Two skies in one layer. The filled clouds sit high and heavy, banking around
 * the masthead the way they do in the Hero; the outline clouds run down both
 * margins at lower opacity to carry that sky past the answer columns.
 *
 * Everything is pinned to the outer thirds — nothing drifts across the measure
 * where the answers are set.
 */
const clouds: CloudConfig[] = [
  {
    src: assets.clouds.soft[0],
    width: SOFT,
    height: SOFT,
    className: "left-[-12%] top-[-4%] w-[46vw] max-w-[480px] opacity-55",
    duration: "22s",
    delay: "-2s",
  },
  {
    src: assets.clouds.soft[1],
    width: SOFT,
    height: SOFT,
    className: "right-[-14%] top-[-6%] w-[48vw] max-w-[500px] opacity-45",
    duration: "26s",
    delay: "-8s",
  },
  {
    src: assets.clouds.outline[1],
    width: OUTLINE_W,
    height: OUTLINE_H,
    className: "left-[-9%] top-[24%] w-[38vw] max-w-[380px] opacity-[0.3]",
    duration: "28s",
    delay: "-7s",
  },
  {
    src: assets.clouds.outline[3],
    width: OUTLINE_W,
    height: OUTLINE_H,
    className: "right-[-10%] top-[46%] w-[36vw] max-w-[360px] opacity-[0.26]",
    duration: "24s",
    delay: "-3s",
  },
  {
    src: assets.clouds.outline[0],
    width: OUTLINE_W,
    height: OUTLINE_H,
    className: "left-[-7%] bottom-[6%] w-[32vw] max-w-[320px] opacity-[0.22]",
    duration: "31s",
    delay: "-12s",
  },
  {
    src: assets.clouds.outline[2],
    width: OUTLINE_W,
    height: OUTLINE_H,
    className: "right-[-6%] bottom-[-2%] w-[34vw] max-w-[340px] opacity-[0.2]",
    duration: "20s",
    delay: "-15s",
  },
];

/**
 * FAQ page body: a centred masthead over category tabs and a two-column
 * answer grid.
 *
 * The type still carries the page — measure, hairlines and whitespace are
 * untouched — but it is now set inside the same sacred landscape as the rest of
 * the site rather than on bare ivory: a sky banking overhead, the two wayang
 * standing guard at the lower corners, a temple on the horizon between them,
 * and a gold filigree closing the masthead. Every layer is aria-hidden, held
 * outside the reading measure, and kept faint enough that body copy never loses
 * contrast against it.
 *
 * The page ends on the last answer. Contact details are not repeated here;
 * the Footer already carries them site-wide.
 */
export function FAQ() {
  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden bg-ivory-warm py-20 sm:py-28 lg:py-32"
    >
      <span aria-hidden className="paper-grain" />

      {/* Sky wash: a pale ceiling that lets the clouds sit on something, and a
          warm brass aura blooming behind the masthead. Two gradients on one
          element so they blend rather than stack as two visible fields. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[52rem]"
        style={{
          backgroundImage: [
            "radial-gradient(62rem 34rem at 50% -7rem, rgba(199,164,106,0.2) 0%, rgba(199,164,106,0.07) 44%, rgba(199,164,106,0) 74%)",
            "linear-gradient(to bottom, rgba(255,251,244,0.9) 0%, rgba(255,251,244,0.45) 34%, rgba(255,251,244,0) 100%)",
          ].join(", "),
        }}
      />

      {/* The one plate whose ink spreads across the whole frame rather than
          hugging an edge (2.1% coverage), so it is the only one that can be
          laid over a section entire without cropping anything meaningful. */}
      <CloudPlate
        src={assets.clouds.layer.all}
        className="inset-x-0 top-0 z-0 aspect-[1080/1350]"
        objectPosition="object-center"
        opacity={0.42}
      />

      <CloudLayer clouds={clouds} className="z-0" />

      {/* The two wayang keeping the lower corners — the same guardians that
          flank the gateway on the homepage, here reduced to watermarks so the
          foot of the page has weight instead of trailing off into blank ivory. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-4%] z-0 hidden w-[26vw] max-w-[280px] opacity-[0.07] sm:block"
      >
        <Image
          src={assets.wayang.left}
          alt=""
          width={1414}
          height={2000}
          sizes="26vw"
          loading="lazy"
          className="h-auto w-full"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[-4%] z-0 hidden w-[26vw] max-w-[280px] opacity-[0.07] sm:block"
      >
        <Image
          src={assets.wayang.right}
          alt=""
          width={1414}
          height={2000}
          sizes="26vw"
          loading="lazy"
          className="h-auto w-full"
        />
      </div>

      {/* Temple on the horizon, centred between the guardians. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 z-0 w-[64vw] max-w-[440px] -translate-x-1/2 opacity-[0.055]"
      >
        <Image
          src={assets.temple}
          alt=""
          width={1080}
          height={1920}
          sizes="64vw"
          loading="lazy"
          className="h-auto w-full"
        />
      </div>

      {/* Ground the base into cream so the section hands off to the Footer on a
          seam rather than an edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-b from-[rgba(255,251,244,0)] to-cream"
      />

      <Container>
        <RevealOnView className="flex flex-col items-center text-center">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-brass-ink">
            FAQ
          </p>
          <h1 className="mt-5 max-w-[18ch] font-editorial text-[clamp(2rem,4.6vw,3.25rem)] font-medium leading-[1.12] tracking-[-0.015em] text-balance text-ink">
            Ada yang ingin ditanyakan?
          </h1>
          <p className="mt-6 max-w-[52ch] text-[0.98rem] leading-[1.8] text-ink-muted">
            Hal-hal yang paling sering ditanyakan peserta, dikelompokkan per
            kategori. Pilih kategori untuk menyaring pertanyaan.
          </p>
          <SectionDivider className="mt-8 max-w-[26rem]" />
        </RevealOnView>

        <FAQTabs items={faqs} />
      </Container>
    </section>
  );
}
