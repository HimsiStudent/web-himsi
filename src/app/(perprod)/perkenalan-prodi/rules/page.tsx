import type { Metadata } from "next";
import { Rules } from "@/components/(pages)/perprodSI/sections/Rules";
import { PageTopBar } from "@/components/(pages)/perprodSI/ui/PageTopBar";

export const metadata: Metadata = {
  title: "Peraturan — Navajivana 2026",
  description: "Peraturan mahasiswa untuk rangkaian kegiatan Navajivana 2026.",
};

export default function RulesPage() {
  return (
    <main id="main">
      <PageTopBar />
      <Rules />
    </main>
  );
}
