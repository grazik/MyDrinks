import { Prisma } from "@prisma/client";

export type DrinkWithIngredients = Prisma.DrinkGetPayload<{
  include: {
    ingredients: {
      include: {
        ingredient: true;
      };
    };
  };
}>;
