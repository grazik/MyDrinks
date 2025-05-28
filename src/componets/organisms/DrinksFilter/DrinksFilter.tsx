import { prisma } from "../../../../lib/db";
import { IngredientType } from "@prisma/client";
import { DrinksFilterClient } from "@/componets/organisms/DrinksFilter/DrinksFilterClient";

export const DrinksFilter = async () => {
  const ingredients = await prisma.ingredient.findMany();

  const spiritNames = ingredients
    .filter((ingredient) => ingredient.type === IngredientType.spirit)
    .map((ingredient) => ingredient.name);

  const ingredientNames = ingredients
    .filter((ingredient) => ingredient.type !== IngredientType.spirit)
    .map((ingredient) => ingredient.name);

  return (
    <DrinksFilterClient
      spiritNames={spiritNames}
      ingredientsNames={ingredientNames}
    />
  );
};
