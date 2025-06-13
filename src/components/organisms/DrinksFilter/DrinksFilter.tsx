import { prisma } from "../../../../db/db";
import { DrinksFilterClient } from "@/components/organisms/DrinksFilter/DrinksFilterClient";
import { groupIngredientsByCategory } from "@/utils/ingredients/ingredients";

export const DrinksFilter = async () => {
  const allIngredients = await prisma.ingredient.findMany();

  const { spirits = [], additional = [] } =
    groupIngredientsByCategory(allIngredients);

  const spiritNames = spirits.map((ingredient) => ingredient.name);

  const ingredientNames = additional.map((ingredient) => ingredient.name);

  return (
    <DrinksFilterClient
      spiritNames={spiritNames}
      ingredientsNames={ingredientNames}
    />
  );
};
