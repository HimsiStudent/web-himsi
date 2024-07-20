"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Gen = {
  id: number;
  name: string;
  pict: string;
  tagline: string;
  year: any;
  desc: string;
};

export default function HeroSectionAbout({ gens }: { gens: Gen[] }) {
  const filteredGens = gens.filter((gen) => gen.pict !== "");
  const genLength = filteredGens.length - 1;
  const [carouselIndex, setCarouselIndex] = useState(genLength);
  const [isPaused, setIsPaused] = useState(false);

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) =>
        prevIndex === 0 ? genLength : prevIndex - 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [genLength, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleOnClick = () => {
    window.location.href = "/home";
  };

  return (
    <>
      <section className="heroAbout">
        {filteredGens.map((gen, index) => (
          <div
            key={gen.id}
            className={`heroAbout-wrapper ${
              index === carouselIndex
                ? "active"
                : index ===
                  (carouselIndex === 0 ? genLength : carouselIndex - 1)
                ? "next"
                : ""
            }`}
          >
            <Image alt={gen.name} src={gen.pict} width={1980} height={1980} />
            <div
              className="desc-wrapper"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="left">
                <div className="titleGen">
                  <h1>{gen.name}</h1>
                  <p>
                    <span>({gen.year})</span> - {gen.tagline}
                  </p>
                </div>
              </div>
              <div className="right">
                <div className="titleGen">
                  <h1>{gen.name}</h1>
                  <p>
                    <span>({gen.year})</span> - {gen.tagline}
                  </p>
                </div>
                <h2>Who are they?</h2>
                <p className="no-cut-desc">{gen.desc}</p>
                <p className="cut-desc">{truncateText(gen.desc, 30)}</p>
                <button className="btn-style-1" onClick={handleOnClick}>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
