import { IngredientType } from "@prisma/client";
import { getIngredients } from "@/db/getIngredients";

const mojitoExample = `{
  "name": "Mojito",
  "recipe": "1. Muddle the **mint leaves**, **lime wedges**, and **sugar** in a glass to release the flavors.\\n2. Fill the glass with **ice cubes**.\\n3. Pour in the **white rum**.\\n4. Top up with **soda water** and stir well.\\n5. Garnish with a **mint sprig** and enjoy! 🍹",
  "source_url": "",
  "ingredients": [
    {
      "ingredientName": "rum",
      "ingredientType": "spirit",
      "amount": 60,
      "unit": "ml"
    },
    {
      "ingredientName": "lime",
      "ingredientType": "fruit", 
      "amount": 1,
      "unit": "pieces"
    },
    {
      "ingredientName": "sugar",
      "ingredientType": "sweetener",
      "amount": 2,
      "unit": "tsp"
    },
    {
      "ingredientName": "mint",
      "ingredientType": "herb",
      "amount": 10,
      "unit": "leaves"
    },
    {
      "ingredientName": "sparkling water",
      "ingredientType": "mixer",
      "amount": 200,
      "unit": "ml"
    }
  ]
}
`;

export const generateDrinkPrompt = async () => {
  const ingredientTypes = Object.values(IngredientType);

  const ingredients = await getIngredients();
  const ingredientsNames = ingredients.map((ing) => ing.name);

  const prompt = `You are a professional cocktail recipe expert.

EXISTING INGREDIENTS IN DATABASE:
${ingredientsNames.map((ing) => `- ${ing}`).join("\n")}

NORMALIZATION RULES:
- Whiskey variants (whiskey, bourbon, rye whiskey) → use "whisky" 
- Citrus (Lemon, LEMON) → use "lemon"
- Simple syrup variants → use "simple syrup"
- Always use lowercase for fruits/herbs
- Always use existing ingredient names when available

INSTRUCTIONS:
- If ingredient exists in database, use EXACT name from list above
- If ingredient doesn't exist, create it using normalized name following the rules
- Generate authentic classic recipe with proper proportions
- Recipe must have at least one spirit ingredient
- Use these exact ingredient types: ${ingredientTypes.join(", ")}
- Ingredient amount must be a positive number, can't be 0
- Prefer "ml" over "oz" unit.

REQUIRED JSON SCHEMA:
{
  "name": "string (cocktail name)",
  "recipe": "string (step-by-step instructions in markdown)",
  "source_url": just write "AI generated"
  "ingredients": [
    {
      "ingredientName": "string (normalized ingredient name)",
      "ingredientType": "${ingredientTypes.join("|")}",
      "amount": number (positive number),
      "unit": "string (oz, ml, dash, etc.)"
    }
  ]
}

EXAMPLE OUTPUT (Mojito):
${mojitoExample}

Generate a classic Manhattan cocktail recipe following the exact JSON format above. 
Include proper step-by-step instructions in the recipe field.
Use traditional proportions and authentic ingredients.

Return ONLY the JSON object, no additional text or formatting.`;

  return prompt;
};
