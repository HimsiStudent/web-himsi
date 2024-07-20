"use client";

import React, { useEffect } from "react";

const ParalaxWave: React.FC = () => {
  // useEffect(() => {
  //   const waves: (HTMLElement | null)[] = Array.from({ length: 5 }, (_, i) =>
  //     document.getElementById(`wave${i}`)
  //   );

  //   window.addEventListener("scroll", function () {
  //     const value: number = window.scrollY;

  //     waves.forEach((wave, i) => {
  //       if (wave) {
  //         const initialBackgroundPositionX = getInitialBackgroundPositionX(i);

  //         wave.style.backgroundPositionX = `${
  //           initialBackgroundPositionX + (i + 1) * value * 2
  //         }px`;
  //       }
  //     });
  //   });

  //   return () => {
  //     window.removeEventListener("scroll", () => {});
  //   };
  // }, []);

  // const getInitialBackgroundPositionX = (index: number): number => {
  //   switch (index) {
  //     case 0:
  //       return 1000;
  //     case 1:
  //       return 300;
  //     case 2:
  //       return 200;
  //     case 3:
  //       return 100;
  //     default:
  //       return 0;
  //   }
  // };

  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={`wave wave${i}`} id={`wave${i}`}></div>
      ))}
    </>
  );
};

export default ParalaxWave;
