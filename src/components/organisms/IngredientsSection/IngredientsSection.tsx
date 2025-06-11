import { getIngredientsByDrinkId } from "../../../../db/getIngredients";

type IngredientsSectionProps = {
  drinkId: string;
};

export const IngredientsSection = async ({
  drinkId,
}: IngredientsSectionProps) => {
  const ingredients = await getIngredientsByDrinkId(drinkId);

  console.log(ingredients);

  return <></>;
};
