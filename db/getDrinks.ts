import { cache } from "react";
import { prisma } from "./db";

export const getDrinksWithIngredients = cache(() =>
  prisma.drink.findMany({
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  }),
);
