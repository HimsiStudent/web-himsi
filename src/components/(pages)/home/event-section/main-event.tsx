import { useState, useEffect } from "react";
import Image from "next/image";
import Chevron from "@/components/(assets)/chevron";
import XSymbol from "@/components/(assets)/x-symbol";
import DescEvent from "./desc-event";

export default function MainEvents() {
  const [events, setEvents] = useState([
    {
      id: 0,
      eventName: "ISFEST",
      url: "/img/compile-isfest.webp",
      logo: "/img/logo-isfest.webp",
      desc: "Information System Festival (ISFEST) is a HIMSI program designed to support the development of both academic and non-academic skills, open to students from all over Indonesia. ISFEST features a series of academic competitions related to the Information Systems study program, as well as non-academic competitions in the field of E-Sports. The event also includes a talk show with competent speakers in the field of Information Systems, presenting material that can be understood by all audiences to enhance their understanding of technology from an Information Systems perspective.",
      isFlipped: false,
    },
    {
      id: 1,
      eventName: "SANDHYAKALA",
      url: "/img/compile-perprod.webp",
      logo: "/img/logo-perprod-2025.webp",
      desc: 'SANDHYAKALA 2025, organized by the Himpunan Mahasiswa Sistem Informasi, aims to introduce the Information Systems Study Program to new students with the theme "Embarking the Cycle – A New Dawn of Transformation" and the tagline "Menggali Potensi, Menjadi Inspirasi." This theme invites new students to embark on their transformative academic journey with renewed spirit and awareness, embracing every phase of growth and change as an essential part of their development. It emphasizes the importance of adaptability, continuous learning, and the courage to start new cycles of innovation and self-discovery. SANDHYAKALA encourages students to explore their potential, cultivate their talents, and inspire others through their journey, becoming proactive learners, future innovators, and influential change-makers in an academic environment that values collaboration and transformation. Moreover, SANDHYAKALA aspires for new students not only to grow within the academic environment but also to become inspiration for their communities and the broader society by applying their knowledge, creativity, and leadership beyond the campus.',
      isFlipped: false,
    },
    {
      id: 2,
      eventName: "DISCO",
      url: "/img/compile.webp",
      logo: "/img/logo-disco11.webp",
      desc: "D’Information System Community Outbound (DISCO) is an annual program organized by the Information Systems Student Association of Universitas Multimedia Nusantara (HIMSI-UMN) with the primary goal of enhancing solidarity and camaraderie among the entire Information Systems family, which includes faculty, alumni, and active students. DISCO was first held in 2010 by the first generation of HIMSI-UMN, previously known as D’Information System Community. This program has been passed down through generations, making DISCO one of the longest-running programs organized by HIMSI-UMN for over 11 years.",
      isFlipped: false,
    },
    {
      id: 3,
      eventName: "Social Is Me",
      url: "/img/compile-sim.webp",
      logo: "/img/logo-sim-2024-bg.webp",
      desc: "Social Is Me (SIM) is a program by HIMSI UMN focused on community service. SIM involves social action activities aimed at helping communities achieve well-being, both in terms of environmental and social aspects. The activities under SIM are carried out through direct actions with the community, including practical work and social outreach. SIM relies on the initiative and concern of UMN students to create a more prosperous and synergistic Indonesian society.",
      isFlipped: false,
    },
  ]);

  const eventLength = events.length - 1;
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleFlippedClick = (index: any) => {
    const updatedEvents = [...events];
    updatedEvents[index].isFlipped = !updatedEvents[index].isFlipped;
    setEvents(updatedEvents);
  };

  const handleNextClick = () => {
    const nextIndex = carouselIndex === eventLength ? 0 : carouselIndex + 1;
    setCarouselIndex(nextIndex);
    resetAllFlips();
  };

  const handlePrevClick = () => {
    const prevIndex = carouselIndex === 0 ? eventLength : carouselIndex - 1;
    setCarouselIndex(prevIndex);
    resetAllFlips();
  };

  const resetAllFlips = () => {
    const updatedEvents = events.map((event) => ({
      ...event,
      isFlipped: false,
    }));
    setEvents(updatedEvents);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!events.some((event) => event.isFlipped)) {
      interval = setInterval(() => {
        const nextIndex = carouselIndex === eventLength ? 0 : carouselIndex + 1;
        setCarouselIndex(nextIndex);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [carouselIndex, eventLength, events]);

  return (
    <div className="event-wrapper">
      {events.map((event, index) => (
        <div
          className={`event-card ${
            index === carouselIndex
              ? "active"
              : index === (carouselIndex + 1) % events.length
              ? "next"
              : ""
          }`}
          key={event.id}
        >
          <div
            className={
              event.isFlipped ? "event-card-inner flip" : "event-card-inner"
            }
          >
            <div className="front">
              <Image
                priority
                className="bg-img-event"
                alt={event.eventName}
                width={375}
                height={500}
                src={event.url}
              />
              <div className="logo-event-wrapper">
                <Image
                  priority
                  alt={event.eventName}
                  width={700}
                  height={700}
                  src={event.logo}
                  onClick={() => handleFlippedClick(index)}
                />
              </div>
            </div>
            <div className="back">
              <span title="Close" onClick={() => handleFlippedClick(index)}>
                <XSymbol />
              </span>
              <DescEvent event={event} />
              <div className="dark-layer"></div>
              <Image
                priority
                className="back-event-bg"
                alt=""
                src={event.url}
                height={100}
                width={500}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="carousel-ctrl">
        <span
          title="previous"
          className="chevron-left"
          onClick={handlePrevClick}
        >
          <Chevron />
        </span>
        <span title="next" className="chevron-right" onClick={handleNextClick}>
          <Chevron />
        </span>
      </div>
    </div>
  );
}
