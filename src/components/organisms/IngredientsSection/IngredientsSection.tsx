import { Drink } from "@prisma/client";
import { getIngredientsByDrinkId } from "@/db/getDrinkIngredients";
import "./ingredients-section.scss";
import {
  H2SectionHeading,
  SectionHeadingType,
} from "@/src/components/atoms/SectionHeading/SectionHeading";
import { toSortedRecipeLines } from "@/src/utils/ingredients/ingredients";
import { getAlcoholicIngredientNames } from "@/src/utils/drinks/drinks";
import { IngredientList } from "./components/IngredientList";
import { VirginNote } from "./components/VirginNote";

type IngredientsSectionProps = {
  Heading?: SectionHeadingType;
  drink: Pick<Drink, "id" | "virginNote">;
};

export const IngredientsSection = async ({
  drink,
  Heading = H2SectionHeading,
}: IngredientsSectionProps) => {
  const ingredients = await getIngredientsByDrinkId(drink.id);

  return (
    <section className="ingredients-section">
      <Heading>Ingredients</Heading>
      <IngredientList lines={toSortedRecipeLines(ingredients)} />
      <VirginNote
        omittedIngredientNames={getAlcoholicIngredientNames({ ingredients })}
        virginNote={drink.virginNote}
      />
    </section>
  );
};
