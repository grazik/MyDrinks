import { Prisma } from "@prisma/client";

export const drinkWithIngredients = {
  drink: {
    include: {
      ingredients: {
        include: { ingredient: true },
      },
    },
  },
} satisfies Prisma.OrderInclude;

export const orderUser = {
  user: {
    select: { id: true, name: true },
  },
} satisfies Prisma.OrderInclude;
