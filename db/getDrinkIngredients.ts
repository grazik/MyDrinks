import { prisma } from "./db";

export const getIngredientsByDrinkId = async (drinkId: string) => {
  const ingredients = await prisma.drinkIngredient.findMany({
    where: {
      drinkId: drinkId,
    },
    include: {
      ingredient: true,
    },
  });

  return ingredients.map((item) => ({
    id: item.id,
    amount: item.amount,
    unit: item.unit,
    name: item.ingredient.name,
    type: item.ingredient.type,
  }));
};
