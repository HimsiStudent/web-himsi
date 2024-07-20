import Image from "next/image";

export default function AboutImage() {
  return (
    <div className="left">
      <Image
        src="/img/about-section.webp"
        alt=""
        width={2000}
        height={2000}
        priority={true}
      />
    </div>
  );
}
