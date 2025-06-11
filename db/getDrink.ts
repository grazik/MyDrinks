import { prisma } from "./db";

export const getDrinkBySlug = async (slug: string[]) => {
  const drink = await prisma.drink.findFirst({
    where: {
      slug: `/${slug.join("/")}`,
    },
  });

  return drink;
};
