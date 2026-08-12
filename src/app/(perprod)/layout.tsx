import { Cinzel, Lora, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/(pages)/perprodSI/layout/Footer";
import { Header } from "@/components/(pages)/perprodSI/layout/Header";
import { HeroLogoProvider } from "@/components/(pages)/perprodSI/layout/HeroLogoProvider";
import { PageTransition } from "@/components/(pages)/perprodSI/layout/PageTransition";
import "./tailwind-perprod.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-lora",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export default function PerprodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`perprod-scope ${cinzel.variable} ${lora.variable} ${jakarta.variable}`}
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        fontFamily: "var(--font-body)",
        margin: 0,
        textRendering: "geometricPrecision",
        minWidth: 320,
      }}
    >
      <HeroLogoProvider>
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </HeroLogoProvider>
    </div>
  );
}
