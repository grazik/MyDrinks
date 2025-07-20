import { generateDrinkPrompt } from "@/LLM/src/prompts/generateDrink";
import ollama from "ollama";
import { CreateDrinkSchema } from "@/lib/validation/drink";
import { withRetry } from "@/src/utils/withRetry";
import { stripJsonTokens } from "@/src/utils/stripJsonTokens";
import * as process from "node:process";

const callLlm = async (prompt: string) => {
  const { response } = await ollama.generate({
    model: process.env.MODEL!,
    prompt,
  });

  const object = JSON.parse(stripJsonTokens(response));
  return CreateDrinkSchema.parse(object);
};

export const generateRecipe = async () => {
  const prompt = await generateDrinkPrompt();

  return await withRetry(() => callLlm(prompt));
};
