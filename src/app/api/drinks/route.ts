import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/db/db";
import { CreateDrinkSchema } from "@/lib/validation/drink";
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

  const photoBuffer = Buffer.from(photo, "base64");
  await fs.promises.writeFile(filePath, photoBuffer);

  return `/${path.relative(PUBLIC_DIR, filePath)}`;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input data with Zod
    const validatedData = CreateDrinkSchema.parse(body);

    // Create drink with ingredients in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // First, ensure all ingredients exist or create them
      const ingredientPromises = validatedData.ingredients.map((ing) => {
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

      const sanitizedDrinkName = sanitizeFilename(validatedData.name);

      const photoPath = validatedData.photo
        ? await saveImage(sanitizedDrinkName, validatedData.photo)
        : null;

      // Create the drink with related ingredients
      const drink = await tx.drink.create({
        data: {
          name: sanitizedDrinkName,
          recipe: validatedData.recipe,
          source_url: validatedData.source_url || null,
          image: photoPath,
          slug: `/drinks/${sanitizedDrinkName}`,
          ingredients: {
            create: validatedData.ingredients.map((ing, index) => ({
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

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors,
        },
        { status: 400 },
      );
    }

    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "A drink with this name already exists" },
          { status: 409 },
        );
      }
    }

    console.error("Error creating drink:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
