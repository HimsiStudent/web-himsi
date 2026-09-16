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

type LogoParticle = {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
};

export default function EventsContainer() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [openEventId, setOpenEventId] = useState<number | null>(null);
  const [logoAnims, setLogoAnims] = useState<Record<number, string>>({});
  const [logoParticles, setLogoParticles] = useState<Record<number, LogoParticle[]>>({});
  const [isRolling, setIsRolling] = useState(false);
  const [isRandomPick, setIsRandomPick] = useState(false);

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

  // Interaksi seru saat logo ditekan di HP / desktop: squish, partikel, & getar halus
  const triggerLogoSquish = (id: number) => {
    triggerRandomLogoAnim(id);

    // Haptic feedback getar halus di HP (jika didukung)
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(18);
      } catch { }
    }

    // Buat partikel warna-warni memancar dari logo
    const count = 6;
    const colors = ["#f15c2d", "#264685", "#fbbf24", "#38bdf8", "#ec4899"];
    const newParticles: LogoParticle[] = Array.from({ length: count }).map((_, i) => {
      const angle = (i * (360 / count) + (Math.random() * 30 - 15)) * (Math.PI / 180);
      const distance = 26 + Math.random() * 22;
      return {
        id: Date.now() + Math.random(),
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.floor(Math.random() * 3) + 6,
      };
    });

    setLogoParticles((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []).slice(-12), ...newParticles],
    }));

    // Bersihkan partikel setelah animasi selesai
    setTimeout(() => {
      setLogoParticles((prev) => ({
        ...prev,
        [id]: (prev[id] || []).filter((p) => !newParticles.some((np) => np.id === p.id)),
      }));
    }, 600);
  };

  // Fitur dadu acak (Lucky Dice Event Picker)
  const handleRollRandomEvent = () => {
    if (isRolling) return;
    setIsRolling(true);

    // Haptic ritmis seperti dadu menggelinding
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([20, 50, 20, 50, 30]);
      } catch { }
    }

    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * eventUrl.length);
      const selected = eventUrl[randomIdx];
      setIsRolling(false);
      setIsRandomPick(true);
      setOpenEventId(selected.id);
    }, 600);
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
      if (e.key === "Escape") {
        setOpenEventId(null);
        setIsRandomPick(false);
      }
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

          {/* Tombol Interaktif Acak Event (Lucky Dice) */}
          <button
            type="button"
            className={`event-random-btn${isRolling ? " is-rolling" : ""}`}
            onClick={handleRollRandomEvent}
            title="Bingung mau lihat apa? Klik untuk pilihkan event acak!"
            aria-label="Pilihkan event acak untukku"
          >
            <motion.span
              className="dice-icon"
              animate={
                isRolling
                  ? {
                    rotate: [0, 180, 360, 540, 720],
                    scale: [1, 1.25, 0.9, 1.2, 1],
                  }
                  : { rotate: 0, scale: 1 }
              }
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              🎲
            </motion.span>
            <span className="dice-text">{isRolling ? "Rolling..." : "Random Pick"}</span>
          </button>
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
              <div
                className="img-wrapper"
                onClick={() => {
                  setIsRandomPick(false);
                  setOpenEventId(event.id);
                }}
                style={{ cursor: "pointer" }}
                title={`Klik untuk melihat detail ${event.name}`}
              >
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
                  <motion.div
                    className="logo-wrapper"
                    whileTap={{ scale: 0.82 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 450, damping: 18 }}
                    onClick={() => triggerLogoSquish(event.id)}
                    onMouseEnter={() => triggerRandomLogoAnim(event.id)}
                    onMouseLeave={() => clearLogoAnim(event.id)}
                    title={`Tekan logo ${event.name}!`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        triggerLogoSquish(event.id);
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

                    {/* Partikel mini melayang saat logo ditekan */}
                    <AnimatePresence>
                      {(logoParticles[event.id] || []).map((p) => (
                        <motion.span
                          key={p.id}
                          className="logo-burst-particle"
                          style={{
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            boxShadow: `0 0 8px ${p.color}`,
                          }}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{
                            x: p.x,
                            y: p.y - 12,
                            opacity: 0,
                            scale: 0.35,
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.55, ease: "easeOut" }}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
                <p className="desc">{event.desc}</p>
                <button
                  type="button"
                  className="read-more"
                  onClick={() => {
                    setIsRandomPick(false);
                    setOpenEventId(event.id);
                  }}
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
            onClick={() => {
              setOpenEventId(null);
              setIsRandomPick(false);
            }}
          >
            <motion.div
              className="event-modal"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {isRandomPick && (
                <div className="random-pick-badge">
                  <span>Random pick event for you to see!</span>
                </div>
              )}

              <button
                type="button"
                className="event-modal-close"
                onClick={() => {
                  setOpenEventId(null);
                  setIsRandomPick(false);
                }}
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
