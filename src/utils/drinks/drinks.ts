import { DrinkType } from "@/src/constants/DrinkType";

type DrinkWithAlcoholFlags = {
  ingredients: { ingredient: { isAlcoholic: boolean } }[];
};

// Without the length check, `every` would call a drink with no ingredient
// rows alcohol-free. Validation never creates one, but deleting an Ingredient
// cascades to DrinkIngredient and can leave a drink empty.
export const isMocktail = ({ ingredients }: DrinkWithAlcoholFlags) =>
  ingredients.length > 0 &&
  ingredients.every(({ ingredient }) => !ingredient.isAlcoholic);

const DRINK_TYPE_MATCHERS: Record<
  DrinkType,
  (drink: DrinkWithAlcoholFlags) => boolean
> = {
  [DrinkType.ALL]: () => true,
  [DrinkType.COCKTAIL]: (drink) => !isMocktail(drink),
  [DrinkType.MOCKTAIL]: isMocktail,
};

export const matchesDrinkType = (
  drink: DrinkWithAlcoholFlags,
  drinkType: DrinkType,
) => DRINK_TYPE_MATCHERS[drinkType](drink);
