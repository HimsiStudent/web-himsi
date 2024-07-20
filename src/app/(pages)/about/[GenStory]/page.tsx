import { Metadata } from "next";
import { gens } from "../data";
import GenStoryHero from "@/components/(pages)/about/genStory/genStory-container";

const GenName = (input: string): string => {
  if (input.length > 3) {
    const firstPart = input.slice(0, 3);
    const secondPart = input.slice(3);
    return `${firstPart} ${secondPart}`;
  }

  return input;
};

export async function generateMetadata({
  params,
}: {
  params: { GenStory: string };
}): Promise<Metadata> {
  const genName: string = GenName(params.GenStory);
  return {
    title: genName || "Default Title",
  };
}

export default function GenStory({ params }: { params: { GenStory: string } }) {
  const genName: string = GenName(params.GenStory);
  const filteredGens = gens.filter((gen) => gen.name === genName);
  const gen = filteredGens[0];

  return (
    <>
      <GenStoryHero gen={gen} />
    </>
  );
}
