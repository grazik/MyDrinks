import { cache } from "react";
import { prisma } from "./db";

export const getIngredientsByDrinkId = cache((drinkId: string) =>
  prisma.drinkIngredient.findMany({
    where: { drinkId },
    include: { ingredient: true },
  }),
);
