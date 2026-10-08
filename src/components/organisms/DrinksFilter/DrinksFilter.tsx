import { DrinksFilterClient } from "@/src/components/organisms/DrinksFilter/DrinksFilterClient";
import {
  buildIngredientFilterOptions,
  getDrinkIngredientNames,
  groupIngredientsByCategory,
} from "@/src/utils/ingredients/ingredients";
import { getDrinksWithIngredients } from "@/db/getDrinks";
import { Suspense } from "react";

export const DrinksFilter = async () => {
  const drinks = await getDrinksWithIngredients();

  const { spirits = [], additional = [] } = groupIngredientsByCategory(
    buildIngredientFilterOptions(drinks),
  );

  return (
    <Suspense>
      <DrinksFilterClient
        spirits={spirits}
        additional={additional}
        drinkIngredientNames={drinks.map(getDrinkIngredientNames)}
      />
    </Suspense>
  );
};
