import { Drink } from "@prisma/client";
import "./recipe-section.scss";
import { markdownToHtml } from "@/utils/markdown";

type RecipeSectionProps = {
  recipe: Drink["recipe"];
};

export const RecipeSection = async ({ recipe }: RecipeSectionProps) => {
  const recipeHTML = await markdownToHtml(recipe);
  return (
    <section className="recipe-section">
      <h2 className={"section-heading"}>Recipe</h2>
      <div
        className={"body-text"}
        dangerouslySetInnerHTML={{ __html: recipeHTML }}
      />
    </section>
  );
};
