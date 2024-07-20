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
    const savedHeight = localStorage.getItem("lineHeight");
    if (lineRef.current && savedHeight) {
      lineRef.current.style.height = `${savedHeight}px`;
    }

    const handleScroll = () => {
      if (lineRef.current && timelineRef.current) {
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;

        let newHeight =
          scrollY - timelineRef.current.offsetTop + viewportHeight / 3;

        lineRef.current.style.height = `${newHeight}px`;
        localStorage.setItem("lineHeight", `${newHeight}`);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [gens]);
  return (
    <>
      <span className="line gray"></span>
      <span className="line orange" ref={lineRef}></span>
    </>
  );
}
