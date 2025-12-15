import { DrinksFilterClient } from "@/src/components/organisms/DrinksFilter/DrinksFilterClient";
import { groupIngredientsByCategory } from "@/src/utils/ingredients/ingredients";
import { getIngredients } from "@/db/getIngredients";
import { Suspense } from "react";

export const DrinksFilter = async () => {
  const allIngredients = await getIngredients();

  const { spirits = [], additional = [] } =
    groupIngredientsByCategory(allIngredients);

  const spiritNames = spirits.map((ingredient) => ingredient.name);

  const ingredientNames = additional.map((ingredient) => ingredient.name);

  return (
    <Suspense>
      <DrinksFilterClient
        spiritNames={spiritNames}
        ingredientsNames={ingredientNames}
      />
    </Suspense>
  );
};
