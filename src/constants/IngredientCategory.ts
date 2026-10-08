export enum IngredientCategory {
  SPIRITS = "spirits",
  ADDITIONAL = "additional",
}

export const INGREDIENT_CATEGORY_LABELS: Record<IngredientCategory, string> = {
  [IngredientCategory.SPIRITS]: "Main spirit",
  [IngredientCategory.ADDITIONAL]: "Other ingredients",
};
