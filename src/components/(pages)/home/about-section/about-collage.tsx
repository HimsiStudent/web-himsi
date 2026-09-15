import Image from "next/image";
import collageConfig from "@/data/about-collage.json";

type CollageSlot = {
  id: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const slots = collageConfig.slots as CollageSlot[];
const { renderWidth, decoration } = collageConfig;

/**
 * Kolase #about versi modular: tiap foto adalah elemen tersendiri di atas
 * kanvas persegi, posisinya diatur lewat src/data/about-collage.json.
 * Ganti foto/posisi di JSON itu, lalu jalankan `npm run collage`.
 */
export default function AboutCollage() {
  return (
    <div className="about-collage">
      <Image
        className="about-collage-deco"
        src={`/img/about-collage/${decoration.file}`}
        alt=""
        width={decoration.width}
        height={decoration.width}
        priority
      />

      {slots.map((slot, index) => (
        <figure
          key={slot.id}
          className="about-collage-item"
          style={{
            left: `${slot.x}%`,
            top: `${slot.y}%`,
            width: `${slot.w}%`,
            height: `${slot.h}%`,
          }}
        >
          <Image
            src={`/img/about-collage/${slot.id}.webp`}
            alt={slot.alt}
            width={Math.round((slot.w / 100) * renderWidth)}
            height={Math.round((slot.h / 100) * renderWidth)}
            priority={index < 4}
          />
        </figure>
      ))}
    </div>
  );
}
