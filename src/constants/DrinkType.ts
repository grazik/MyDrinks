export enum DrinkType {
  ALL = "all",
  COCKTAIL = "cocktail",
  MOCKTAIL = "mocktail",
}

export const DRINK_TYPE_LABELS: Record<DrinkType, string> = {
  [DrinkType.ALL]: "All",
  [DrinkType.COCKTAIL]: "Cocktails",
  [DrinkType.MOCKTAIL]: "Mocktails",
};
