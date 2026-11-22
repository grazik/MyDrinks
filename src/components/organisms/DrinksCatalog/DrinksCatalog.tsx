import { Suspense } from "react";
import { getDrinksWithIngredients } from "@/db/getDrinks";
import { DrinksCatalogClient } from "@/src/components/organisms/DrinksCatalog/DrinksCatalogClient";
import {
  buildIngredientFilterOptions,
  groupIngredientsByCategory,
} from "@/src/utils/ingredients/ingredients";

export const DrinksCatalog = async () => {
  const drinks = await getDrinksWithIngredients();

  const { spirits = [], additional = [] } = groupIngredientsByCategory(
    buildIngredientFilterOptions(drinks),
  );

  return (
    <Suspense>
      <DrinksCatalogClient
        drinks={drinks}
        spirits={spirits}
        additional={additional}
      />
    </Suspense>
  );
};
