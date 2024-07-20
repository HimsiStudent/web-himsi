"use client";

import { useState } from "react";
import HeroSectionAbout from "./hero-section";
import WhoAreWe from "./who-are-we";
import Timeline from "./timeline/timeline";
import EventSection from "../home/event-section/event-section";
import FamilyTagline from "./family-tag";
import PhotoGallery from "./gallery";
import PopUpNotFoundGenData from "./pop-up-not-found-gen-data";

interface Gen {
  id: number;
  name: string;
  pict: string;
  tagline: string;
  year: any;
  desc: string;
  legacy: string;
  shortLegacy: string;
}

interface TimelineProps {
  gens: Gen[];
}

export default function AboutContainer({ gens }: TimelineProps) {
  const [isPopUpActive, setPopUpActive] = useState(false);
  return (
    <>
      <HeroSectionAbout gens={gens} setPopUpActive={setPopUpActive} />
      <FamilyTagline />
      <WhoAreWe />
      <PhotoGallery />
      <Timeline gens={gens} setPopUpActive={setPopUpActive} />
      <PopUpNotFoundGenData
        gens={gens}
        isPopUpActive={isPopUpActive}
        setPopUpActive={setPopUpActive}
      />
    </>
  );
}
