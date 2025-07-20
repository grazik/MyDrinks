import { prisma } from "./db";

export const getDrinkBySlug = async (slug: string[]) => {
  const drink = await prisma.drink.findFirst({
    where: {
      slug: `/${slug.join("/")}`,
    },
  });

  return drink;
};

export const getDrinkIdByName = async (name: string) => {
  try {
    const drink = await prisma.drink.findUnique({
      where: {
        name: name.toLowerCase().trim(), // Normalize for comparison
      },
      select: { id: true }, // Only fetch ID for performance
    });

    return !!drink;
  } catch (error) {
    console.warn(`Error while fetching ${name}`, error);
    return false; // Proceed with generation on error
  }
};
