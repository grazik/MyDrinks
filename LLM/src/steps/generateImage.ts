import { CreateDrinkInput } from "@/lib/validation/drink";
import { generateImagePrompt } from "@/LLM/src/prompts/generateImagePromp";
import ollama from "ollama";
import { stripJsonTokens } from "@/src/utils/stripJsonTokens";
import { GoogleGenAI } from "@google/genai";
import { withRetry } from "@/src/utils/withRetry";
import { buildSimpleSelectionPrompt } from "@/LLM/src/prompts/buildSimpleSelectionPrompt";

const parseSimpleResponse = (response: string): number => {
  // Extract just the number from response
  const cleaned = response.trim().replace(/\D/g, ""); // Remove all non-digits
  const number = parseInt(cleaned.charAt(0)); // Take first digit

  // Validate range
  if (number >= 1 && number <= 4) {
    return number - 1; // Convert to 0-based index
  }

  throw new Error(`Invalid selection: ${response}`);
};

const selectBestImage = async (
  images: string[],
  cocktailName: string,
  originalPrompt: string, // Pass the prompt used for recipe generation
): Promise<number> => {
  return withRetry(async () => {
    const prompt = buildSimpleSelectionPrompt(cocktailName, originalPrompt);

    const { response } = await ollama.generate({
      model: process.env.MODEL!,
      prompt,
      images,
      options: {
        temperature: 0.1,
        num_predict: 10, // Much shorter since we only want a number
      },
    });

    return parseSimpleResponse(response);
  });
};

export const generateImage = async (coctailData: CreateDrinkInput) => {
  const prompt = await generateImagePrompt(coctailData);

  const { response } = await ollama.generate({
    model: process.env.MODEL!,
    prompt,
  });
  const imagePrompt = stripJsonTokens(response);

  console.log(imagePrompt);
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

  const { generatedImages = [] } = await ai.models.generateImages({
    model: "imagen-3.0-generate-002",
    prompt: imagePrompt,
  });

  const images = generatedImages
    .map(({ image }) => image?.imageBytes)
    .filter((str): str is string => !!str);

  const selectedIndex = await selectBestImage(
    images,
    coctailData.name,
    imagePrompt,
  );

  return images[selectedIndex];
};
