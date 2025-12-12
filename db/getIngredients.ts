import { prisma } from "@/db/db";

export const getIngredients = () => {
  return prisma.ingredient.findMany();
};
