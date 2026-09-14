"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  eventCategories,
  eventUrl,
  type EventCategory,
} from "@/app/(main)/(pages)/event/data";

type FilterId = EventCategory | "all";

export default function EventsContainer() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [openEventId, setOpenEventId] = useState<number | null>(null);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: eventUrl.length };
    eventUrl.forEach((event) => {
      result[event.category] = (result[event.category] ?? 0) + 1;
    });
    return result;
  }, []);

  const visibleEvents = useMemo(
    () =>
      activeFilter === "all"
        ? eventUrl
        : eventUrl.filter((event) => event.category === activeFilter),
    [activeFilter]
  );

  const openedEvent = eventUrl.find((event) => event.id === openEventId);

  useEffect(() => {
    if (!openedEvent) return;

    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenEventId(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [openedEvent]);

  return (
    <>
      <section id="eventPage-container" className="eventPage-container">
        <h1>OUR EVENTS</h1>

        <div className="event-filter-bar">
          <div className="event-filter-pill">
            {eventCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`event-filter-tab${
                  activeFilter === category.id ? " active" : ""
                }`}
                onClick={() => setActiveFilter(category.id)}
                aria-pressed={activeFilter === category.id}
              >
                <span className="label">{category.label}</span>
                <span className="count">{counts[category.id] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="wrapper-event">
          {visibleEvents.map((event) => (
            <article key={event.id} className="event">
              <div className="img-wrapper">
                <Image
                  priority
                  alt={event.name}
                  src={event.url}
                  width={1920}
                  height={1080}
                />
              </div>
              <div className="desc-wrapper">
                <div className="title">
                  <h2>{event.name}</h2>
                  <div className="logo-wrapper">
                    {event.logo !== "" && (
                      <Image
                        priority
                        alt={`Logo ${event.name}`}
                        src={event.logo}
                        width={1000}
                        height={1000}
                      />
                    )}
                  </div>
                </div>
                <p className="desc">{event.desc}</p>
                <button
                  type="button"
                  className="read-more"
                  onClick={() => setOpenEventId(event.id)}
                >
                  Lihat Selengkapnya <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {openedEvent && (
        <div
          className="event-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={openedEvent.name}
          onClick={() => setOpenEventId(null)}
        >
          <div
            className="event-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event-modal-close"
              onClick={() => setOpenEventId(null)}
              aria-label="Tutup"
            >
              &times;
            </button>
            <div className="event-modal-img">
              <Image
                alt={openedEvent.name}
                src={openedEvent.url}
                width={1920}
                height={1080}
              />
            </div>
            <div className="event-modal-body">
              <div className="title">
                <h2>{openedEvent.name}</h2>
                <div className="logo-wrapper">
                  {openedEvent.logo !== "" && (
                    <Image
                      alt={`Logo ${openedEvent.name}`}
                      src={openedEvent.logo}
                      width={1000}
                      height={1000}
                    />
                  )}
                </div>
              </div>
              <p>{openedEvent.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
