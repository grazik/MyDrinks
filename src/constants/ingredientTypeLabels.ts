import { IngredientType } from "@prisma/client";

export const INGREDIENT_TYPE_LABELS: Record<IngredientType, string> = {
  spirit: "Spirits",
  mixer: "Mixers",
  syrup: "Syrups",
  sweetener: "Sweeteners",
  fruit: "Fruit",
  herb: "Herbs",
  bitter: "Bitters",
};

export const ADDITIONAL_INGREDIENT_TYPES_ORDER: IngredientType[] = [
  "mixer",
  "syrup",
  "sweetener",
  "fruit",
  "herb",
  "bitter",
];
