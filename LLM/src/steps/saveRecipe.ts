import { CreateDrinkInput } from "@/lib/validation/drink";
import { prisma } from "@/db/db";
import path from "path";
import fs from "fs";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_DIR = path.join(PUBLIC_DIR, "images", "drinks");

const sanitizeFilename = (filename: string): string =>
  filename
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens

const saveImage = async (sanitizedDrinkName: string, photo: string) => {
  const fileName = `${sanitizedDrinkName}.png`;

  const filePath = path.join(IMAGE_DIR, fileName);

  const buffer = Buffer.from(photo, "base64");
  await fs.writeFileSync(filePath, buffer);

  return `/${path.relative(PUBLIC_DIR, filePath)}`;
};

export const saveRecipe = async (recipe: CreateDrinkInput, image: string) => {
  return await prisma.$transaction(async (tx) => {
    const ingredientPromises = recipe.ingredients.map((ing) => {
      return tx.ingredient.upsert({
        where: { name: ing.ingredientName },
        update: {},
        create: {
          name: ing.ingredientName,
          type: ing.ingredientType,
        },
      });
    });

    const ingredients = await Promise.all(ingredientPromises);

    const sanitizedDrinkName = sanitizeFilename(recipe.name);

    const photoPath = image ? await saveImage(sanitizedDrinkName, image) : null;

    // Create the drink with related ingredients
    const drink = await tx.drink.create({
      data: {
        name: sanitizedDrinkName,
        recipe: recipe.recipe,
        source_url: recipe.source_url || null,
        image: photoPath,
        slug: `/drinks/${sanitizedDrinkName}`,
        ingredients: {
          create: recipe.ingredients.map((ing, index) => ({
            amount: ing.amount,
            unit: ing.unit,
            ingredient: {
              connect: { id: ingredients[index].id },
            },
          })),
        },
      },
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return drink;
  });
};
