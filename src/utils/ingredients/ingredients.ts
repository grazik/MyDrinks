import { IngredientType } from "@prisma/client";
import { IngredientCategory } from "@/src/constants/IngredientCategory";

export type IngredientFilterOption = {
  name: string;
  type: IngredientType;
  drinkCount: number;
};

export type ActiveDrinkFilters = Record<IngredientCategory, string[] | undefined>;

type DrinkWithIngredientNames = {
  ingredients: { ingredient: { name: string; type: IngredientType } }[];
};

export const groupIngredientsByCategory = <T extends { type: IngredientType }>(
  ingredients: T[],
) => {
  return Object.groupBy(ingredients, ({ type }) =>
    type === IngredientType.spirit
      ? IngredientCategory.SPIRITS
      : IngredientCategory.ADDITIONAL,
  );
};

export const getDrinkIngredientNames = (drink: DrinkWithIngredientNames) =>
  drink.ingredients.map(({ ingredient }) => ingredient.name);

// Options are derived from the drinks rather than the ingredients table so
// that only ingredients which can actually produce results are offered.
export const buildIngredientFilterOptions = (
  drinks: DrinkWithIngredientNames[],
): IngredientFilterOption[] => {
  const uniqueIngredients = new Map(
    drinks.flatMap((drink) =>
      drink.ingredients.map(({ ingredient }) => [ingredient.name, ingredient]),
    ),
  );

  const countDrinksWith = (name: string) =>
    drinks.filter((drink) => getDrinkIngredientNames(drink).includes(name))
      .length;

  return [...uniqueIngredients.values()]
    .map(({ name, type }) => ({ name, type, drinkCount: countDrinksWith(name) }))
    .sort((a, b) => b.drinkCount - a.drinkCount || a.name.localeCompare(b.name));
};

const hasAnyOf = (ingredientNames: string[], selected: string[] = []) =>
  selected.length === 0 ||
  selected.some((name) => ingredientNames.includes(name));

// OR inside a category, AND between categories.
export const matchesDrinkFilters = (
  ingredientNames: string[],
  filters: ActiveDrinkFilters,
) =>
  hasAnyOf(ingredientNames, filters[IngredientCategory.SPIRITS]) &&
  hasAnyOf(ingredientNames, filters[IngredientCategory.ADDITIONAL]);
