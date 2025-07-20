import { generateRecipe } from "@/LLM/src/steps/generateRecipe";
import { generateImage } from "@/LLM/src/steps/generateImage";
import "dotenv/config";
import { saveRecipe } from "@/LLM/src/steps/saveRecipe";

const main = async () => {
  try {
    console.log("STEP 1 | Generating recipe:");
    const recipe = await generateRecipe();

    console.log("STEP 2 | Generating image:");
    const image = await generateImage(recipe);

    console.log("STEP 3 | saving recipe");
    const drink = await saveRecipe(recipe, image);

    console.log("generated drink:", drink);
  } catch (error) {
    console.error(error);
  }
};

main();
