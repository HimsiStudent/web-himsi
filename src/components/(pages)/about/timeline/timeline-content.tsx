interface Gen {
  id: number;
  name: string;
  pict: string;
  tagline: string;
  year: any;
  desc: string;
  legacy: string;
  shortLegacy: string;
}

interface TimelineProps {
  gens: Gen;
}

export default function TimelineContent({ gens }: TimelineProps) {
  return (
    <>
      <div className="content">
        <p>{gens.year}</p>
        <h2>
          {gens.name} : <span>{gens.shortLegacy}</span>
        </h2>
        <p>{gens.legacy}</p>
      </div>
    </>
  );
}
