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

export default function HeroSectionAbout({
  gens,
  setPopUpActive,
}: {
  gens: Gen[];
  setPopUpActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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

  function handleOnClick(gen: any) {
    const hasEmptyField = Object.values(gen).some((value) => value === "");

    if (hasEmptyField) {
      setPopUpActive(true);
      return;
    }
    window.location.href = "/about/" + gen.name.replace(/\s+/g, "");
  }

  // New: Navigation Handlers
  const goToNext = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === 0 ? genLength : prevIndex - 1
    );
    setIsPaused(true);
  };

  const goToPrev = () => {
    setCarouselIndex((prevIndex) =>
      prevIndex === genLength ? 0 : prevIndex + 1
    );
    setIsPaused(true);
  };

  return (
    <>
      <section className="heroAbout">
        <button className="nav-button left" onClick={goToPrev} aria-label="Previous">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
    viewBox="0 0 24 24"
    style={{ transform: "rotate(180deg)" }}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
</button>

<button className="nav-button right" onClick={goToNext} aria-label="Next">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
    viewBox="0 0 24 24"
    
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
</button>

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
            <Image
              priority
              alt={gen.name}
              src={gen.pict}
              width={1980}
              height={1980}
            />
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
                <button
                  className="btn-style-1"
                  onClick={() => handleOnClick(gen)}
                >
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
