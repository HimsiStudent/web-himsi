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
      <p>{gen.year}</p>
    </>
  );
}
