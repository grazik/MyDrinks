import { DrinkWithIngredients } from "@/src/components/organisms/DrinksGrid/DrinkGrid";
import {
  ActiveDrinkFilters,
  getDrinkIngredientNames,
  matchesDrinkFilters,
} from "@/src/utils/ingredients/ingredients";

export const filterDrinksByIngredients = (
  drinks: DrinkWithIngredients[],
  filters: ActiveDrinkFilters,
) =>
  drinks.filter((drink) =>
    matchesDrinkFilters(getDrinkIngredientNames(drink), filters),
  );
