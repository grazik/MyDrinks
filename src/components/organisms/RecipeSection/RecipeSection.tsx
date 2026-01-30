import { Drink } from "@prisma/client";
import "./recipe-section.scss";
import { markdownToHtml } from "@/src/utils/markdown";
import {
  H2SectionHeading,
  SectionHeadingType,
} from "@/src/components/atoms/SectionHeading/SectionHeading";

type RecipeSectionProps = {
  Heading?: SectionHeadingType;
  recipe: Drink["recipe"];
};

export const RecipeSection = async ({
  recipe,
  Heading = H2SectionHeading,
}: RecipeSectionProps) => {
  const recipeHTML = await markdownToHtml(recipe);
  return (
    <section className="recipe-section">
      <Heading>Recipe</Heading>
      <div
        className={"body-text"}
        dangerouslySetInnerHTML={{ __html: recipeHTML }}
      />
    </section>
  );
};
