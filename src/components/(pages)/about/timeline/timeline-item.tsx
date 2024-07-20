import { useEffect } from "react";
import TimelineContent from "./timeline-content";

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
  setPopUpActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimelineItem({ gens, setPopUpActive }: TimelineProps) {
  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            if (item.classList.contains("even")) {
              item.classList.remove("fade-out-right");
              item.classList.add("fade-in-right");
            } else {
              item.classList.remove("fade-out-left");
              item.classList.add("fade-in-left");
            }
          } else {
            if (item.classList.contains("even")) {
              item.classList.remove("fade-in-right");
              item.classList.add("fade-out-right");
            } else {
              item.classList.remove("fade-in-left");
              item.classList.add("fade-out-left");
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    items.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      items.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, [gens]);

  function handleOnClick(gen: any) {
    const hasEmptyField = Object.values(gen).some((value) => value === "");

    if (hasEmptyField) {
      setPopUpActive(true);
      return;
    }
    window.location.href = "/about/" + gen.name.replace(/\s+/g, "");
  }

  return (
    <>
      {gens.map((gen, index) => (
        <div
          key={gen.id}
          className={`timeline-item ${index % 2 === 0 ? "odd" : "even"}`}
          onClick={() => handleOnClick(gen)}
        >
          <div className="seeMoreWrapper">Click To See More Story</div>
          <TimelineContent gens={gen} />
        </div>
      ))}
    </>
  );
}
