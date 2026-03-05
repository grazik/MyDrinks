import { Metadata } from "next";
import { getDrinkBySlug } from "@/db/getDrink";
import { ImagesSection } from "@/src/components/organisms/ImagesSection/ImagesSection";
import { notFound } from "next/navigation";
import { IngredientsSection } from "@/src/components/organisms/IngredientsSection/IngredientsSection";
import { RecipeSection } from "@/src/components/organisms/RecipeSection/RecipeSection";
import { ContentBand } from "@/src/components/atoms/ContentBand/ContentBand";
import { BackButton } from "@/src/components/atoms/BackButton/BackButton";

import "./pdp.scss";
import { PdpQuickOrderControls } from "./PdpQuickOrderControls";

interface DrinkPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: Pick<DrinkPageProps, "params">): Promise<Metadata> {
  const { slug } = await params;

  const drink = await getDrinkBySlug(slug);

  return {
    title: drink?.name,
  };
}

export default async function PDP({ params }: DrinkPageProps) {
  const { slug } = await params;

  const drink = await getDrinkBySlug(slug);

  if (!drink) {
    notFound();
  }

  return (
    <main className="wrapper">
      <ContentBand>
        <BackButton label={"Back"} />
      </ContentBand>
      <div className="pdp">
        <h1 className={"main-heading"}>{drink.name}</h1>
        <div className="pdp-content">
          {drink.image && <ImagesSection drink={drink} />}
          <IngredientsSection drinkId={drink.id} />
          <PdpQuickOrderControls drinkId={drink.id} />
          <RecipeSection recipe={drink.recipe} />
        </div>
      </div>
    </main>
  );
}
