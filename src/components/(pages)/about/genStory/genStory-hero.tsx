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
        <Image priority alt="" src={gen.pict} width={3000} height={3000} />
      </section>
    </>
  );
}
