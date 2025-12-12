import { DrinkWithIngredients } from "@/src/components/organisms/DrinksGrid/DrinkGrid";

export const filterDrinksByIngredients = (
  drinks: DrinkWithIngredients[],
  ingredientsNames: string[],
) => {
  if (ingredientsNames.length > 0) {
    return drinks.filter(({ ingredients }) =>
      ingredients.some((ingredient) =>
        ingredientsNames.includes(ingredient.ingredient.name),
      ),
    );
  }

  return drinks;
};
