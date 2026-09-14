"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  eventCategories,
  eventUrl,
  type EventCategory,
} from "@/app/(main)/(pages)/event/data";

type FilterId = EventCategory | "all";

export default function EventsContainer() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [openEventId, setOpenEventId] = useState<number | null>(null);
  const [logoAnims, setLogoAnims] = useState<Record<number, string>>({});

  const triggerRandomLogoAnim = (id: number) => {
    const anims = [
      "cute-anim-wiggle",
      "cute-anim-jelly",
      "cute-anim-nod",
      "cute-anim-heartbeat",
    ];
    const current = logoAnims[id];
    const available = anims.filter((a) => a !== current);
    const next = available[Math.floor(Math.random() * available.length)];
    setLogoAnims((prev) => ({ ...prev, [id]: next }));
  };

  const clearLogoAnim = (id: number) => {
    setLogoAnims((prev) => ({ ...prev, [id]: "" }));
  };

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
        <div className="event-hero-banner">
          <h1>OUR EVENTS</h1>
        </div>

        <div className="event-filter-bar">
          <div className="event-filter-pill">
            {eventCategories.map((category) => {
              const isActive = activeFilter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`event-filter-tab${isActive ? " active" : ""}`}
                  onClick={() => setActiveFilter(category.id)}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterBubble"
                      className="active-pill-background"
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    />
                  )}
                  <span className="tab-label">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={activeFilter}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="wrapper-event"
        >
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
                  <div
                    className="logo-wrapper"
                    onClick={() => setOpenEventId(event.id)}
                    onMouseEnter={() => triggerRandomLogoAnim(event.id)}
                    onMouseLeave={() => clearLogoAnim(event.id)}
                    title={`Klik untuk melihat detail ${event.name}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenEventId(event.id);
                      }
                    }}
                  >
                    {event.logo !== "" && (
                      <Image
                        priority
                        className={`event-logo-interactive ${logoAnims[event.id] || ""}`}
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
                  Lihat Selengkapnya{" "}
                  <span className="arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </button>
              </div>
            </article>
          ))}
        </motion.div>
      </section>

      {/* Modal Detail Event */}
      <AnimatePresence>
        {openedEvent && (
          <motion.div
            className="event-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={openedEvent.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={() => setOpenEventId(null)}
          >
            <motion.div
              className="event-modal"
              initial={{ opacity: 0, scale: 0.98, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
                <p className="modal-desc">{openedEvent.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
