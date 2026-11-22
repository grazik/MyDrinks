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
      "isAlcoholic": true,
      "amount": 60,
      "unit": "ml"
    },
    {
      "ingredientName": "lime",
      "ingredientType": "fruit", 
      "isAlcoholic": false,
      "amount": 1,
      "unit": "pieces"
    },
    {
      "ingredientName": "sugar",
      "ingredientType": "sweetener",
      "isAlcoholic": false,
      "amount": 2,
      "unit": "tsp"
    },
    {
      "ingredientName": "mint",
      "ingredientType": "herb",
      "isAlcoholic": false,
      "amount": 10,
      "unit": "leaves"
    },
    {
      "ingredientName": "sparkling water",
      "ingredientType": "mixer",
      "isAlcoholic": false,
      "amount": 200,
      "unit": "ml"
    }
  ]
}
`;

export const generateDrinkPrompt = async (drinkName: string) => {
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
- The drink may be alcohol-free (a mocktail): no spirit or other alcoholic ingredient is required
- Use these exact ingredient types: ${ingredientTypes.join(", ")}
- Set "isAlcoholic" on every ingredient: true if it contains any alcohol (spirits, liqueurs such as triple sec, wine, beer, cider, bitters such as angostura), false only if it contains none. If unsure, use true
- Ingredient amount must be a positive number, can't be 0
- Prefer "ml" over "oz" unit.

REQUIRED JSON SCHEMA:
{
  "name": "string (drink name)",
  "recipe": "string (step-by-step instructions in markdown)",
  "source_url": just write "AI generated"
  "ingredients": [
    {
      "ingredientName": "string (normalized ingredient name)",
      "ingredientType": "${ingredientTypes.join("|")}",
      "isAlcoholic": boolean (true if the ingredient contains any alcohol),
      "amount": number (positive number),
      "unit": "string (oz, ml, dash, etc.)"
    }
  ]
}

EXAMPLE OUTPUT (Mojito):
${mojitoExample}

Generate a classic ${drinkName} recipe (cocktail or mocktail) following the exact JSON format above.
Include proper step-by-step instructions in the recipe field.
Use traditional proportions and authentic ingredients.

Return ONLY the JSON object, no additional text or formatting.`;

  return prompt;
};
