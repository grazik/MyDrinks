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

// Only ingredients used by at least one drink can produce results, so the
// options are derived from the drinks rather than the ingredients table.
export const buildIngredientFilterOptions = (
  drinks: DrinkWithIngredientNames[],
): IngredientFilterOption[] => {
  const options = new Map<string, IngredientFilterOption>();

  for (const drink of drinks) {
    const countedInThisDrink = new Set<string>();

    for (const { ingredient } of drink.ingredients) {
      if (countedInThisDrink.has(ingredient.name)) continue;
      countedInThisDrink.add(ingredient.name);

      const option = options.get(ingredient.name) ?? {
        name: ingredient.name,
        type: ingredient.type,
        drinkCount: 0,
      };
      option.drinkCount += 1;
      options.set(ingredient.name, option);
    }
  }

  return [...options.values()].sort(
    (a, b) => b.drinkCount - a.drinkCount || a.name.localeCompare(b.name),
  );
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
