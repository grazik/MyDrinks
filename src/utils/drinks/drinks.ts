import { DrinkType } from "@/src/constants/DrinkType";

type DrinkWithAlcoholFlags = {
  ingredients: { ingredient: { isAlcoholic: boolean } }[];
};

// A drink without ingredient rows is unknown, not alcohol-free: calling it a
// mocktail could serve alcohol to someone who asked for none.
export const isMocktail = ({ ingredients }: DrinkWithAlcoholFlags) =>
  ingredients.length > 0 &&
  ingredients.every(({ ingredient }) => !ingredient.isAlcoholic);

export const matchesDrinkType = (
  drink: DrinkWithAlcoholFlags,
  drinkType: DrinkType,
) => {
  if (drinkType === DrinkType.ALL) return true;
  return isMocktail(drink) === (drinkType === DrinkType.MOCKTAIL);
};
