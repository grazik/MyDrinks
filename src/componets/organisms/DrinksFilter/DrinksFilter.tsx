import { prisma } from "../../../../lib/db";
import { FilterChipBar } from "@/componets/molecules/FilterChipBar/FilterChipBar";
import { IngredientType } from "@prisma/client";

export const DrinksFilter = async () => {
  const ingredients = await prisma.ingredient.findMany();
  console.log(ingredients);

  const spiritNames = ingredients
    .filter((ingredient) => ingredient.type === IngredientType.spirit)
    .map((ingredient) => ingredient.name);

  const otherIngredientNames = ingredients
    .filter((ingredient) => ingredient.type !== IngredientType.spirit)
    .map((ingredient) => ingredient.name);

  return (
    <>
      <FilterChipBar heading="Filter by Main Spirit" chips={spiritNames} />
      <FilterChipBar
        chips={otherIngredientNames}
        heading="Filter by other ingredients"
      />
    </>
  );
};
