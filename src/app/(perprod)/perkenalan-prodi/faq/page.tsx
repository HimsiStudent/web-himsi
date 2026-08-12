import type { Metadata } from "next";
import { FAQ } from "@/components/(pages)/perprodSI/sections/FAQ";
import { PageTopBar } from "@/components/(pages)/perprodSI/ui/PageTopBar";

export const metadata: Metadata = {
  title: "FAQ - Navajivana 2026",
  description: "Pertanyaan seputar perkenalan program studi Navajivana 2026.",
};

export default function FAQPage() {
  return (
    <main id="main">
      <PageTopBar />
      <FAQ />
    </main>
  );
}
