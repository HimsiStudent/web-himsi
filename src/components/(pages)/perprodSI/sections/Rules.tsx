import Image from "next/image";
import { CloudPlate } from "@/components/(pages)/perprodSI/ui/CloudPlate";
import { Container } from "@/components/(pages)/perprodSI/ui/Container";
import { MandalaAccent } from "@/components/(pages)/perprodSI/ui/MandalaAccent";
import { Medallion } from "@/components/(pages)/perprodSI/ui/Medallion";
import { RevealOnView } from "@/components/(pages)/perprodSI/ui/RevealOnView";
import { RuleCategoryCard } from "@/components/(pages)/perprodSI/ui/RuleCategoryCard";
import { SectionShell } from "@/components/(pages)/perprodSI/ui/SectionShell";
import { assets } from "@/lib/perprodSI/assets";
import { ruleCategories } from "@/lib/perprodSI/rules";

const sealGlyph = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M7 3h8l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    <path d="M15 3v4h4" />
    <path d="M9 12h6M9 15.5h6M9 8.5h3" />
  </svg>
);

const alertGlyph = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M12 3.5 2.5 20h19L12 3.5z" />
    <line x1="12" y1="10" x2="12" y2="14.5" />
    <line x1="12" y1="17.3" x2="12" y2="17.4" />
  </svg>
);

/**
 * Peraturan mahasiswa — editorial two-column layout modeled after FAQ: a
 * sticky left rail (fact sheet + firm sanctions notice) fills the space that
 * used to leave the page feeling empty, while the accordion chapters keep the
 * "content speaks" restraint. Tone stays deliberately firm (navy-led, single
 * restrained gold aura) rather than the softer, cloud-and-wayang atmosphere
 * used on FAQ — this is a decree, not an invitation.
 */
export function Rules() {
  return (
    <SectionShell
      id="rules"
      className="overflow-hidden bg-gradient-to-b from-cream via-ivory/40 to-cream"
    >
      {/* Still a single restrained gold aura behind the letterhead — it just
          has form now. The meru gates read as the threshold the rules guard,
          and the mask dissolves them well before the first line of text, so
          the section keeps reading firm rather than dreamy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[340px] opacity-[0.22]"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 85%)",
        }}
      >
        <Image
          src={assets.bg.candi}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* 46% ink — kept narrow and near-invisible so the section stays firm
          rather than drifting into the softer atmosphere of the other pages. */}
      <CloudPlate
        src={assets.clouds.layer.right}
        className="right-0 top-1/2 z-0 hidden w-[22vw] max-w-[260px] -translate-y-1/2 aspect-[1080/1350] lg:block"
        objectPosition="object-right"
        opacity={0.12}
      />

      <MandalaAccent
        src={assets.mandala.starEmber}
        opacity={0.09}
        className="-right-28 top-[22%] hidden w-[420px] lg:block"
      />

      <Container>
        {/* Header — letterhead framing: seal beside the title, closed by a
            gold rule. */}
        <RevealOnView>
          <div className="flex items-start gap-5">
            <div className="hidden shrink-0 sm:block">
              <Medallion size={60} className="mt-1">
                {sealGlyph}
              </Medallion>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-earth-deep sm:text-xs">
                Tata Tertib
              </p>
              <h2 className="mt-4 font-serif text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.1] text-navy">
                Peraturan
                <br />
                Mahasiswa
              </h2>
              <p className="mt-4 max-w-[36rem] text-sm leading-relaxed text-navy/60 sm:text-base">
                Ketentuan yang wajib dipatuhi seluruh peserta demi menjaga
                ketertiban, keamanan, dan kelancaran kegiatan.
              </p>
            </div>
          </div>
          <span aria-hidden className="mt-8 block h-px w-full bg-gold/30" />
        </RevealOnView>

        {/* Body — sticky left rail (fact sheet + sanctions notice) beside the
            accordion chapters, so the page fills its width instead of one
            lonely centered column. */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-x-12">
          {/* Left rail */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:col-span-4">
            {/* Fact sheet */}
            <RevealOnView delay={0.05} amount={0.3}>
              <div className="rounded-[1.75rem] border border-gold/30 bg-cream/70 p-7 backdrop-blur-[1px]">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-earth-deep">
                  Ringkasan
                </p>
                <dl className="mt-4 flex flex-col divide-y divide-gold/15">
                  <div className="flex items-start gap-3 py-4 first:pt-0">
                    <span
                      aria-hidden
                      className="mt-[0.4rem] h-2 w-2 shrink-0 rotate-45 rounded-[2px] border border-gold bg-gold/40"
                    />
                    <div>
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-earth-deep">
                        Berlaku untuk
                      </dt>
                      <dd className="mt-1 font-serif text-base font-semibold leading-snug text-navy">
                        Seluruh peserta Navajivana 2026
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 py-4 last:pb-0">
                    <span
                      aria-hidden
                      className="mt-[0.4rem] h-2 w-2 shrink-0 rotate-45 rounded-[2px] border border-gold bg-gold/40"
                    />
                    <div>
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-earth-deep">
                        Sifat
                      </dt>
                      <dd className="mt-1 font-serif text-base font-semibold leading-snug text-navy">
                        Wajib &amp; mengikat
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 py-4 last:pb-0">
                    <span
                      aria-hidden
                      className="mt-[0.4rem] h-2 w-2 shrink-0 rotate-45 rounded-[2px] border border-gold bg-gold/40"
                    />
                    <div>
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-earth-deep">
                        Babak
                      </dt>
                      <dd className="mt-1 font-serif text-base font-semibold leading-snug text-navy">
                        Hari briefing (Zoom) &amp; hari kegiatan (kampus UMN)
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </RevealOnView>

            {/* Pemberitahuan — deep navy, firm tone. Mirrors FAQ's contact
                panel structurally, but the message is a warning, not an
                invitation, per the "tegas" brief. */}
            <RevealOnView delay={0.1} amount={0.3}>
              <div className="relative overflow-hidden rounded-[1.75rem] border border-gold/40 bg-gradient-to-br from-navy via-[#1f2f40] to-[#16222f] px-7 py-8 shadow-[0_28px_60px_-30px_rgba(36,55,74,0.7)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-60 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(215,185,122,0.3), transparent 70%)",
                  }}
                />
                <div className="relative flex flex-col items-start gap-4">
                  <Medallion size={52}>{alertGlyph}</Medallion>
                  <h3 className="font-serif text-lg font-semibold leading-snug text-cream">
                    Pemberitahuan
                  </h3>
                  <p className="text-sm leading-relaxed text-cream/70">
                    Peserta WAJIB menjaga tata tertib dan kesopanan selama
                    kegiatan berlangsung. Setiap peraturan yang dilanggar akan
                    menjadi bahan pertimbangan kelulusan Navajivana 2026.
                  </p>
                  <p className="text-sm leading-relaxed text-cream/70">
                    Perlu diingat bahwa kegiatan OMB UMN tidak sama atau berbeda
                    dengan perkenalan prodi Sistem Informasi atau yang kita
                    sebut dengan Navajivana 2026. Jadi, bagi yang lulus OMB,
                    belum tentu lulus dalam Navajivana 2026, begitu juga
                    sebaliknya.
                  </p>
                </div>
              </div>
            </RevealOnView>
          </div>

          {/* Accordion chapters */}
          <div className="lg:col-span-8">
            {ruleCategories.map((category, i) => (
              <RevealOnView key={category.ordinal} delay={i * 0.05} amount={0.2}>
                <RuleCategoryCard
                  category={category}
                  defaultOpen={i === 0}
                  id={`bab-${category.ordinal.toLowerCase()}`}
                />
              </RevealOnView>
            ))}

            {/* Closing statement — firm sign-off instead of trailing into
                blank space after the last chapter. */}
            <p className="mt-8 border-t border-gold/20 pt-6 text-xs leading-relaxed text-navy/50">
              Peraturan ini berlaku sejak diterbitkan dan mengikat seluruh
              peserta selama rangkaian kegiatan Navajivana 2026 berlangsung.
            </p>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
