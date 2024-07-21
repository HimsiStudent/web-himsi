"use client";

import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useInView } from "react-intersection-observer";

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
  gen: Gen;
}

export default function GenStoryDetails({ gen }: TimelineProps) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    setStartTyping(inView);
  }, [inView]);
  return (
    <>
      <section className="genStory-details-container">
        <h1>
          <div className="wrapper">
            {gen.name}
            <small>({gen.year})</small>{" "}
          </div>
          <q ref={ref}>
            {startTyping && (
              <Typewriter
                words={[gen.tagline]}
                loop={1}
                cursor
                cursorStyle=""
                typeSpeed={50}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            )}
          </q>
        </h1>
        <h3>
          <span className="font-clr-blue">Who Are </span>{" "}
          <span className="font-clr-orange">They?</span>
        </h3>
        <p>{gen.desc}</p>
        <h3>
          <span className="font-clr-blue">The </span>{" "}
          <span className="font-clr-orange">Legacy</span>
        </h3>
        <p>{gen.legacy}</p>
      </section>
    </>
  );
}
