import { DivisionRealms } from "@/components/(pages)/perprodSI/sections/DivisionRealms";
import { Hero } from "@/components/(pages)/perprodSI/sections/Hero";
import { Philosophy } from "@/components/(pages)/perprodSI/sections/Philosophy";
import { QuickAccess } from "@/components/(pages)/perprodSI/sections/QuickAccess";
import { Timeline } from "@/components/(pages)/perprodSI/sections/Timeline";
import { SectionDivider } from "@/components/(pages)/perprodSI/ui/SectionDivider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Navajivana 2026 — Beginning Anew",
  description:
    "Navajivana 2026 · Beginning Anew, Becoming Starts Now. Berani Melangkah, Hadirkan Jejak Baru.",
};

export default function PerkenalanProdiPage() {
  return (
    <main id="main">
      <Hero />
      <QuickAccess />
      <SectionDivider className="-mb-6 md:-mb-10" />
      <Philosophy />
      <DivisionRealms />
      <Timeline />
    </main>
  );
}
