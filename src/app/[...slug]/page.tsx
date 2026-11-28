import { Metadata } from "next";
import { getDrinkBySlug } from "@/db/getDrink";
import { ImagesSection } from "@/src/components/organisms/ImagesSection/ImagesSection";
import { notFound } from "next/navigation";
import { IngredientsSection } from "@/src/components/organisms/IngredientsSection/IngredientsSection";
import { RecipeSection } from "@/src/components/organisms/RecipeSection/RecipeSection";
import { ContentBand } from "@/src/components/atoms/ContentBand/ContentBand";
import { BackButton } from "@/src/components/atoms/BackButton/BackButton";
import { Tag } from "@/src/components/atoms/tag/Tag";
import { VirginOrderProvider } from "@/src/contexts/VirginOrderContext/VirginOrderProvider";
import { getIngredientsByDrinkId } from "@/db/getDrinkIngredients";
import { isMocktail } from "@/src/utils/drinks/drinks";
import tokens from "@/src/styles/tokens.module.scss";

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

  const ingredients = await getIngredientsByDrinkId(drink.id);

  return (
    <main className="wrapper">
      <ContentBand>
        <BackButton label={"Back"} fallbackHref={"/"} />
      </ContentBand>
      <div className="pdp">
        <div className="pdp__title">
          <h1 className={"main-heading"}>{drink.name}</h1>
          {isMocktail({ ingredients }) && (
            <Tag
              title="Mocktail · alcohol-free"
              bgColor={tokens.colorIceAqua}
              variant="subtle"
            />
          )}
        </div>
        <div className="pdp-content">
          {drink.image && <ImagesSection drink={drink} />}
          <VirginOrderProvider>
            <IngredientsSection drink={drink} />
            <PdpQuickOrderControls drink={drink} />
          </VirginOrderProvider>
          <RecipeSection recipe={drink.recipe} />
        </div>
      </div>
    </main>
  );
}
