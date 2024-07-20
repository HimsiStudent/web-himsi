interface Gen {
  id: number;
  name: string;
  pict: string;
  tagline: string;
  year: any;
  desc: string;
}

interface TimelineProps {
  gens: Gen[];
}

export default function TimelineDot({ gens }: TimelineProps) {
  return (
    <>
      <div className="dot-wrapper">
        {gens.map((gen) => (
          <span key={gen.id} id={`dot${gen.id}`} className={`dot`}></span>
        ))}
      </div>
    </>
  );
}
