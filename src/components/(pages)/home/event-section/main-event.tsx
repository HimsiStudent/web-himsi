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
      url: "/img/compile-isfest.png",
      logo: "/img/logo-isfest.png",
      desc: "Information System Festival (ISFEST) merupakan program kerja HIMSI dalam mendukung pengembangan akademik dan non-akademik yang dapat diikuti oleh seluruh mahasiswa dan pelajar dari seluruh Indonesia. ISFEST berisikan rangkaian kegiatan perlombaan di bidang akademik yang berhubungan dengan program studi Sistem Informasi dan perlombaan non-akademik dalam bidang E-Sports Rangkaian kegiatan ISFEST juga berisikan Talkshow dengan menghadirkan pembicara-pembiacara yang kompeten dalam bidang Sistem Informasi dengan isi materi yang dapat diterima oleh seluruh kalangan dari dalam memahami teknologi dari sisi Sistem Informasi.",
      isFlipped: false,
    },
    {
      id: 1,
      eventName: "prastavana",
      url: "/img/compile-perprod.png",
      logo: "/img/logo-perprod.png",
      desc: "PRASTAVANA 2024, di bawah Himpunan Mahasiswa Sistem Informasi, bertujuan memperkenalkan Program Studi Sistem Informasi kepada mahasiswa baru dengan tema 𝚃𝚛𝚊𝚗𝚜𝚏𝚘𝚛𝚖𝚊𝚝𝚒𝚘𝚗 𝚃𝚘𝚠𝚊𝚛𝚍𝚜 𝚃𝚑𝚎 𝙵𝚞𝚝𝚞𝚛𝚎 dan tagline 𝑩𝒂𝒏𝒈𝒌𝒊𝒕𝒌𝒂𝒏 𝑲𝒓𝒆𝒂𝒕𝒊𝒗𝒊𝒕𝒂𝒔, 𝑪𝒊𝒑𝒕𝒂𝒌𝒂𝒏 𝑰𝒏𝒐𝒗𝒂𝒔𝒊. Tema ini mendorong mahasiswa baru untuk menghadapi tantangan perkuliahan dengan semangat dan pola pikir terbuka, mengenali potensi diri, serta merancang perjalanan akademik sesuai tujuan. Tagline tersebut mengajak mereka meningkatkan kreativitas dan inovasi, berpikir di luar batasan, menciptakan solusi baru, dan menjadi penggerak perubahan dalam lingkungan akademik yang mendorong eksperimen dan kolaborasi.",
      isFlipped: false,
    },
    {
      id: 2,
      eventName: "DISCO",
      url: "/img/compile.png",
      logo: "/img/logo-disco.png",
      desc: "D’Information System Community Outbond (DISCO) merupakan program kerja tahunan Himpunan Sistem Informasi Universitas Multimedia Nusantara (HIMSI-UMN) dengan tujuan utama meningkatkan solidaritas dan keakraban seluruh Keluarga Besar Mahasiswa/i Sistem Informasi (KBM SI) yang terdiri atas dosen, alumni, serta mahasiswa/i aktif sistem informasi Universitas Multimedia Nusantara. DISCO pertama kali diselenggarakan pada tahun 2010 oleh HIMSI-UMN generasi pertama yang dahulu dikenal sebagai D’Information System Community. Program kerja ini dilanjutkan secara turun temurun oleh setiap generasi, menjadikan DISCO sebagai salah satu program kerja terlama yang telah diselenggarakan oleh HIMSI-UMN selama 11 tahun.",
      isFlipped: false,
    },
    {
      id: 3,
      eventName: "Social Is Me",
      url: "/img/compile-sim.png",
      logo: "/img/logo-sim.png",
      desc: "Social Is Me (SIM) merupakan program kerja HIMSI UMN yang bergerak dalam pengabdian kepada masyarakat. SIM berisikan kegiatan aksi sosial dengan tujuan membantu masyarakat mencapai kesejahteraan dari sisi lingkungan alam ataupun sosial. Rangkaian kegiatan SIM dilakukan dengan pelaksanaan aksi langsung kepada masyarakat, baik melalui kerja nyata, maupun melalui penyuluhan sosial. Kegiatan SIM mengandalkan inisiatif dan kepedulian mahasiswa UMN dalam menciptakan lingkungan masyarakat Indonesia yang lebih sejahtera dan bersinergi.",
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
                className="bg-img-event"
                alt={event.eventName}
                width={375}
                height={500}
                src={event.url}
              />
              <div className="logo-event-wrapper">
                <Image
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
