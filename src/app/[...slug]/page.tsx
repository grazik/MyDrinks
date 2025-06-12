import { Metadata } from "next";
import { getDrinkBySlug } from "../../../db/getDrink";
import { ImagesSection } from "@/components/organisms/ImagesSection/ImagesSection";
import { notFound } from "next/navigation";
import { IngredientsSection } from "@/components/organisms/IngredientsSection/IngredientsSection";
import { RecipeSection } from "@/components/organisms/RecipeSection/RecipeSection";

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
    <>
      <h1 className={"main-heading main-heading--light-color"}>{drink.name}</h1>
      <ImagesSection drink={drink} />
      <IngredientsSection drinkId={drink.id} />
      <RecipeSection recipe={drink.recipe} />
    </>
  );
}
