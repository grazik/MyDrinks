"use client";

import { useDrinkFilters } from "@/hooks/useDrinkFilters";
import { DrinkWithIngredients } from "@/components/organisms/DrinksGrid/DrinkGrid";
import { filterDrinksByIngredients } from "@/components/organisms/DrinksGrid/DrinkGrid.utils";
import { DrinkCard } from "@/components/molecules/DrinkCard/DrinkCard";

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
