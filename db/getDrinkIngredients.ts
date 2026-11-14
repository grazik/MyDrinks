import { prisma } from "./db";

export const getIngredientsByDrinkId = (drinkId: string) =>
  prisma.drinkIngredient.findMany({
    where: { drinkId },
    include: { ingredient: true },
  });
