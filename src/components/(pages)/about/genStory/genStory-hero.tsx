import Image from "next/image";

interface Gen {
  id: number;
  name: string;
  pict: string;
  year: any;
}

interface TimelineProps {
  gen: Gen;
}

export default function GenStoryHero({ gen }: TimelineProps) {
  if (gen.pict == "") {
    return;
  }
  return (
    <>
      <section className="genStory-hero">
        <Image
          priority
          alt=""
          src={gen.pict}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </section>
    </>
  );
}
