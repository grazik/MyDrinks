import { generateRecipe } from "@/LLM/src/steps/generateRecipe";
import { generateImage } from "@/LLM/src/steps/generateImage";
import "dotenv/config";
import { saveRecipe } from "@/LLM/src/steps/saveRecipe";
import { getDrinkIdByName } from "@/db/getDrink";

interface ProcessingResult {
  name: string;
  status: "success" | "failed" | "skipped";
  duration?: number;
  error?: string;
}

const pipeline = async (drinkName: string) => {
  try {
    const doesExist = await getDrinkIdByName(drinkName);

    console.log("STEP 0 | Checking if exists", drinkName);

    if (doesExist) {
      console.log(`⏭️  ${drinkName}: Already exists, skipping generation`);
      return null;
    }

    console.log("STEP 1 | Generating recipe for:", drinkName);
    const recipe = await generateRecipe(drinkName);

    console.log("STEP 2 | Generating image:");
    const image = await generateImage(recipe);

    console.log("STEP 3 | saving recipe");
    await saveRecipe(recipe, image);

    console.log("generated drink:", drinkName);
  } catch (error) {
    console.error(error);
  }
};

const processCocktailBatch = async (
  cocktailNames: string[],
): Promise<ProcessingResult[]> => {
  const results: ProcessingResult[] = [];

  console.log(
    `\n🚀 Starting batch processing for ${cocktailNames.length} cocktails...\n`,
  );

  for (let i = 0; i < cocktailNames.length; i++) {
    const name = cocktailNames[i];
    const startTime = Date.now();

    console.log(`[${i + 1}/${cocktailNames.length}] Processing: ${name}`);

    try {
      const result = await pipeline(name);
      const duration = Date.now() - startTime;

      results.push({
        name,
        status: !!result ? "success" : "skipped",
        duration,
      });

      console.log(`✅ ${name}: Completed in ${duration}ms\n`);
    } catch (error) {
      const duration = Date.now() - startTime;

      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;

      results.push({
        name,
        status: "failed",
        error: message,
        duration,
      });

      console.error(`❌ ${name}: Failed after ${duration}ms - ${message}\n`);
    }
  }

  return results;
};

// CLI parsing
const main = async () => {
  const cocktailNames = process.argv.slice(2);

  if (cocktailNames.length === 0) {
    console.error(
      'Usage: npm run generate-batch "Mojito" "Margarita" "Negroni"',
    );
    process.exit(1);
  }

  // Execute batch processing
  processCocktailBatch(cocktailNames).then((results) => {
    const successful = results.filter((r) => r.status === "success").length;
    const failed = results.filter((r) => r.status === "failed").length;
    const skipped = results.filter((r) => r.status === "skipped").length;

    console.log(`\n📊 Batch Complete:`);
    console.log(`   ✅ Successful: ${successful}`);
    console.log(`   ⏭️ Skipped (existing): ${skipped}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   📄 Total: ${results.length}`);

    if (failed > 0) {
      console.log("\n❌ Failed cocktails:");
      results
        .filter((r) => r.status === "failed")
        .forEach((r) => console.log(`   - ${r.name}: ${r.error}`));
    }
  });
};

main();
