"use client";

import { useDrinkFilters } from "@/src/hooks/useDrinkFilters";
import { DrinkWithIngredients } from "@/src/components/organisms/DrinksGrid/DrinkGrid";
import { DrinksFilter } from "@/src/components/organisms/DrinksFilter/DrinksFilter";
import { DrinksGrid } from "@/src/components/organisms/DrinksGrid/DrinksGrid";
import { filterDrinks } from "@/src/components/organisms/DrinksCatalog/DrinksCatalog.utils";
import { IngredientFilterOption } from "@/src/utils/ingredients/ingredients";

type DrinksCatalogClientProps = {
  drinks: DrinkWithIngredients[];
  spirits: IngredientFilterOption[];
  additional: IngredientFilterOption[];
};

export const DrinksCatalogClient = ({
  drinks,
  spirits,
  additional,
}: DrinksCatalogClientProps) => {
  const { activeFilters, drinkType } = useDrinkFilters();
  const filteredDrinks = filterDrinks(drinks, activeFilters, drinkType);

  return (
    <>
      <DrinksFilter
        spirits={spirits}
        additional={additional}
        resultCount={filteredDrinks.length}
      />
      <DrinksGrid drinks={filteredDrinks} />
    </>
  );
};
