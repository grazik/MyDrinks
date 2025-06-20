"use client";

import { useDrinkFilters } from "@/src/hooks/useDrinkFilters";
import { DrinkWithIngredients } from "@/src/components/organisms/DrinksGrid/DrinkGrid";
import { filterDrinksByIngredients } from "@/src/components/organisms/DrinksGrid/DrinkGrid.utils";
import { DrinkCard } from "@/src/components/molecules/DrinkCard/DrinkCard";

type DrinksGridClientProps = {
  drinksWithIngredients: DrinkWithIngredients[];
};

export const DrinksGridClient = ({
  drinksWithIngredients,
}: DrinksGridClientProps) => {
  const [{ spirits = [], ingredients = [] }] = useDrinkFilters();

  const drinksBySpirit = filterDrinksByIngredients(
    drinksWithIngredients,
    spirits,
  );
  const drinkByIngredients = filterDrinksByIngredients(
    drinksBySpirit,
    ingredients,
  );

  return (
    <>
      {drinkByIngredients.map((drink) => (
        <DrinkCard drink={drink} key={drink.id} />
      ))}
    </>
  );
};
