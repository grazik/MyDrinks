import { DrinkWithIngredients } from "@/src/components/organisms/DrinksGrid/DrinkGrid";
import { DrinkType } from "@/src/constants/DrinkType";
import { matchesDrinkType } from "@/src/utils/drinks/drinks";
import {
  ActiveDrinkFilters,
  getDrinkIngredientNames,
  matchesDrinkFilters,
} from "@/src/utils/ingredients/ingredients";

export const filterDrinks = (
  drinks: DrinkWithIngredients[],
  filters: ActiveDrinkFilters,
  drinkType: DrinkType,
) =>
  drinks.filter(
    (drink) =>
      matchesDrinkType(drink, drinkType) &&
      matchesDrinkFilters(getDrinkIngredientNames(drink), filters),
  );
