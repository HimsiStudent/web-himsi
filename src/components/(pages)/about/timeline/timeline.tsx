import React, { useRef } from "react";
import TimelineItem from "./timeline-item";
import TimelineLine from "./timeline-line";
import TimelineDot from "./timeline-dot";

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

export default function Timeline({ gens }: TimelineProps) {
  const timelineRef = useRef<HTMLElement>(null);

  return (
    <section id="timeline" className="timeline" ref={timelineRef}>
      <h1>
        <span className="font-clr-blue">OUR</span>{" "}
        <span className="font-clr-orange">LEGACY</span>
      </h1>
      <div className="wrapper">
        <TimelineLine gens={gens} timelineRef={timelineRef} />
        <TimelineDot gens={gens} />
        <TimelineItem gens={gens} />
      </div>
    </section>
  );
}
