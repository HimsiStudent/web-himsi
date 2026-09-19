"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PhotoGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "150px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className={`gallery-container ${isInView ? "in-view" : "paused"}`}
      >
        <div className="upper">
          <div className="img-wrapper">
            <Image
              /* priority */
              alt=""
              src="/img/gallery/upper-min.webp"
              width={13390}
              height={600}
            />
          </div>
        </div>
        <div className="lower">
          <div className="img-wrapper">
            <Image
              /* priority */
              alt=""
              src="/img/gallery/lower-min.webp"
              width={13390}
              height={600}
            />
          </div>
        </div>
      </section>
    </>
  );
}
