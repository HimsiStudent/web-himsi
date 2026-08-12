import AboutContainer from "@/components/(pages)/about/about-container";
import { Metadata } from "next";
import { gens } from "./data";

export const metadata: Metadata = {
  title: "About Us",
};
export default function About() {
  return (
    <>
      <AboutContainer gens={gens} />
    </>
  );
}
