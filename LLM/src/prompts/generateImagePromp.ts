import { CreateDrinkInput } from "@/lib/validation/drink";

export async function generateImagePrompt(cocktailData: CreateDrinkInput) {
  const imagePromptGenerationPrompt = `
You are a professional cocktail photography expert. Generate ONE classic-style image prompt for Google's Imagen 3 to create photos of a ${cocktailData.name}.

COCKTAIL DETAILS:
Name: ${cocktailData.name}
Ingredients: ${cocktailData.ingredients.map((ing) => `${ing.amount}${ing.unit} ${ing.ingredientName}`).join(", ")}
Recipe: ${cocktailData.recipe}

PROMPT REQUIREMENTS:
- Classic cocktail photography style
- Include appropriate glassware for this specific cocktail
- Mention key visual elements (liquid color, garnish, ice if applicable)
- Warm, traditional bar atmosphere
- Professional but timeless presentation
- Maximum 60 words
- Focus on authenticity and traditional appeal

EXAMPLE FORMAT:
"Traditional [cocktail name] in [appropriate glass] with [garnish], warm amber lighting, classic wooden bar setting"

Generate exactly one classic image prompt in this JSON format:
{
  "prompt": "your classic prompt text here"
}

Return ONLY the JSON object:`;

  return imagePromptGenerationPrompt;
}
