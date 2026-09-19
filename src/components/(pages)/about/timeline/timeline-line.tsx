import { RefObject, useEffect, useRef } from "react";

interface Gen {
  id: number;
  name: string;
  pict: string;
  tagline: string;
  year: any;
  desc: string;
}

interface TimelineProps {
  gens: Gen[];
  timelineRef: any;
}

export default function TimelineLine({ gens, timelineRef }: TimelineProps) {
  const lineRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let ticking = false;

    const updateLine = () => {
      if (lineRef.current && timelineRef.current) {
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;

        const newHeight =
          scrollY - timelineRef.current.offsetTop + viewportHeight / 3;

        lineRef.current.style.height = `${newHeight}px`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateLine);
        ticking = true;
      }
    };

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [gens, timelineRef]);
  return (
    <>
      <span className="line gray"></span>
      <span className="line orange" ref={lineRef}></span>
    </>
  );
}
