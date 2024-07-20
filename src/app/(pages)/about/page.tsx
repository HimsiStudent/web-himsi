import AboutContainer from "@/components/(pages)/about/about-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};
export default function About() {
  return (
    <>
      <AboutContainer />
    </>
  );
}
