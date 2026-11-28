import { DrinkType } from "@/src/constants/DrinkType";
import {
  DrinkIngredientRow,
  toSortedRecipeLines,
} from "@/src/utils/ingredients/ingredients";

export type DrinkWithAlcoholFlags = {
  ingredients: { ingredient: { isAlcoholic: boolean } }[];
};

type DrinkWithVirginFlags = DrinkWithAlcoholFlags & {
  isVirginAllowed: boolean;
};

// Without the length check, `every` would call a drink with no ingredient
// rows alcohol-free. Validation never creates one, but deleting an Ingredient
// cascades to DrinkIngredient and can leave a drink empty.
export const isMocktail = ({ ingredients }: DrinkWithAlcoholFlags) =>
  ingredients.length > 0 &&
  ingredients.every(({ ingredient }) => !ingredient.isAlcoholic);

// Stricter than `!isMocktail`: a drink with no ingredient rows has nothing to
// leave out, so it gets no virgin option either.
export const isVirginAvailable = ({
  isVirginAllowed,
  ingredients,
}: DrinkWithVirginFlags) =>
  isVirginAllowed &&
  ingredients.some(({ ingredient }) => ingredient.isAlcoholic);

export const getAlcoholicIngredientNames = ({
  ingredients,
}: {
  ingredients: DrinkIngredientRow[];
}) => [
  ...new Set(
    toSortedRecipeLines(ingredients)
      .filter(({ isAlcoholic }) => isAlcoholic)
      .map(({ name }) => name),
  ),
];

export enum IngredientListStyle {
  LABEL = "label",
  SENTENCE = "sentence",
}

const LAST_NAME_JOINER: Record<IngredientListStyle, string> = {
  [IngredientListStyle.LABEL]: "&",
  [IngredientListStyle.SENTENCE]: "and",
};

export const formatIngredientNames = (
  names: string[],
  style: IngredientListStyle,
) => {
  if (names.length < 2) return names.join("");

  return `${names.slice(0, -1).join(", ")} ${LAST_NAME_JOINER[style]} ${names.at(-1)}`;
};

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
