import { IngredientType } from "@prisma/client";
import { IngredientCategory } from "@/constants/IngredientCategory";

export const groupIngredientsByCategory = <T extends { type: IngredientType }>(
  ingredients: T[],
) => {
  return Object.groupBy(ingredients, ({ type }) =>
    type === IngredientType.spirit
      ? IngredientCategory.SPIRITS
      : IngredientCategory.INGREDIENTS,
  );
};
