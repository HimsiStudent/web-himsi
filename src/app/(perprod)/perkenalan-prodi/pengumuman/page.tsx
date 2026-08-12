import type { Metadata } from "next";
import { Announcements } from "@/components/(pages)/perprodSI/sections/Announcements";
import { PageTopBar } from "@/components/(pages)/perprodSI/ui/PageTopBar";

export const metadata: Metadata = {
  title: "Pengumuman — Navajivana 2026",
  description:
    "Informasi resmi mengenai lokasi, penugasan, atribut, dan jadwal kegiatan Navajivana 2026.",
};

export default function PengumumanPage() {
  return (
    <main id="main">
      <PageTopBar />
      <Announcements />
    </main>
  );
}
