import Image from "next/image";
import { CloudLayer, type CloudConfig } from "@/components/(pages)/perprodSI/ui/CloudLayer";
import { CloudPlate } from "@/components/(pages)/perprodSI/ui/CloudPlate";
import { Container } from "@/components/(pages)/perprodSI/ui/Container";
import { RealmCard } from "@/components/(pages)/perprodSI/ui/RealmCard";
import { RevealOnView } from "@/components/(pages)/perprodSI/ui/RevealOnView";
import { SectionHeading } from "@/components/(pages)/perprodSI/ui/SectionHeading";
import { SectionShell } from "@/components/(pages)/perprodSI/ui/SectionShell";
import { assets } from "@/lib/perprodSI/assets";
import { realms } from "@/lib/perprodSI/realms";

/** `realms` is ordered deliberately — DHARANI (BPH) leads. */
const [leadRealm, ...restRealms] = realms;

const SWIRL = 2380;

const realmClouds: CloudConfig[] = [
  {
    src: assets.clouds.swirl[0],
    width: SWIRL,
    height: SWIRL,
    className: "left-[-10%] top-[3%] w-[38vw] max-w-[400px] opacity-45",
    duration: "27s",
    delay: "-7s",
  },
  {
    src: assets.clouds.swirl[1],
    width: SWIRL,
    height: SWIRL,
    className: "right-[-9%] bottom-[6%] w-[40vw] max-w-[420px] opacity-35",
    duration: "22s",
    delay: "-3s",
  },
];

/**
 * The centerpiece: seven elemental realms, each a card opening its own modal.
 * Wayang guardians frame the section (asset guide: wayang = section framing)
 * and clouds soften the seams.
 */
export function DivisionRealms() {
  return (
    <SectionShell
      id="divisions"
      className="overflow-hidden bg-gradient-to-b from-cream via-ivory/50 to-cream"
    >
      {/* This was the only main section without any sky. The swirl clouds are
          the same family as the Hero's, so the atmosphere carries through. */}
      <CloudLayer clouds={realmClouds} className="z-0" />

      {/* Named "awan depan wayang" in the source set, and this is the only
          section with wayang guardians — so it finally sits where it belongs,
          over the right-hand figure. Only 0.6% ink, hence the high opacity. */}
      <CloudPlate
        src={assets.clouds.layer.front}
        className="right-0 top-1/2 z-[1] hidden w-[22vw] max-w-[260px] -translate-y-1/2 aspect-[1080/1350] lg:block"
        objectPosition="object-right"
        opacity={0.5}
      />

      {/* Wayang guardians framing the realms (desktop only, decorative) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 hidden w-[200px] opacity-[0.16] lg:block xl:w-[240px]"
      >
        <Image
          src={assets.wayang.left}
          alt=""
          width={1414}
          height={2000}
          sizes="240px"
          className="h-auto w-full"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 hidden w-[200px] opacity-[0.16] lg:block xl:w-[240px]"
      >
        <Image
          src={assets.wayang.right}
          alt=""
          width={1414}
          height={2000}
          sizes="240px"
          className="h-auto w-full"
        />
      </div>

      <Container>
        <RevealOnView>
          <SectionHeading
            kicker="Divisi"
            title="Tujuh Elemen, Tujuh Penjaga"
            subtitle="Setiap divisi adalah sebuah elemen, atmosfer, dan perannya sendiri. Sentuh sebuah divisi untuk menelusuri maknanya."
          />
        </RevealOnView>

        {/* DHARANI (BPH) stands alone at the top — the foundation the other six
            rest on — then the remaining realms fill the grid evenly. The lead
            card is clamped to one column's width so it matches the row below. */}
        <div className="mt-14 space-y-6">
          <div className="mx-auto w-full sm:max-w-[calc((100%-1.5rem)/2)] lg:max-w-[calc((100%-3rem)/3)]">
            <RevealOnView amount={0.2}>
              <RealmCard realm={leadRealm} />
            </RevealOnView>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restRealms.map((realm, i) => (
              <RevealOnView key={realm.key} delay={(i + 1) * 0.06} amount={0.2}>
                <RealmCard realm={realm} />
              </RevealOnView>
            ))}
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
