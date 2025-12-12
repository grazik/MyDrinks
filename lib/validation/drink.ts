import { z } from "zod";
import { IngredientType } from "@prisma/client";

export const IngredientTypeSchema = z.nativeEnum(IngredientType);

export const DrinkIngredientInputSchema = z.object({
  ingredientName: z.string().min(1, "Ingredient name is required"),
  ingredientType: IngredientTypeSchema, // Now automatically synced with Prisma
  amount: z.number().positive("Amount must be positive"),
  unit: z.string().min(1, "Unit is required"),
});

export const CreateDrinkSchema = z
  .object({
    name: z
      .string()
      .min(1, "Drink name is required")
      .max(100)
      .regex(/[a-zA-Z]/, "Drink name must contain at least one letter")
      .regex(/^[a-zA-Z0-9\s\-'&.]+$/, "Drink name contains invalid characters"),
    recipe: z.string().min(1, "Recipe is required"),
    source_url: z
      .string()
      .url()
      .optional()
      .or(z.literal(""))
      .or(z.literal("AI generated")),
    photo: z.string().optional(),
    ingredients: z
      .array(DrinkIngredientInputSchema)
      .min(1, "At least one ingredient is required"),
  })
  .refine(
    (data) =>
      data.ingredients.some(
        (ingredient) => ingredient.ingredientType === IngredientType.spirit,
      ),
    {
      message: "At least one spirit ingredient is required",
      path: ["ingredients"], // This will attach the error to the ingredients field
    },
  );

// Type inference still works perfectly
export type CreateDrinkInput = z.infer<typeof CreateDrinkSchema>;
export type IngredientTypeValue = z.infer<typeof IngredientTypeSchema>;
