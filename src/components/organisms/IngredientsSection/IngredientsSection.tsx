import { getIngredientsByDrinkId } from "../../../../db/getDrinkIngredients";
import { IngredientCategoryGroup } from "@/components/organisms/IngredientsSection/components/IngredientCategoryGroup";
import { IngredientCategory } from "@/constants/IngredientCategory";
import { groupIngredientsByCategory } from "@/utils/ingredients/ingredients";
import "./ingredients-section.scss";

type IngredientsSectionProps = {
  drinkId: string;
};

export const IngredientsSection = async ({
  drinkId,
}: IngredientsSectionProps) => {
  const ingredients = await getIngredientsByDrinkId(drinkId);
  const drinkIngredientsGroupedByCategory =
    groupIngredientsByCategory(ingredients);
  console.log(ingredients);
  const categories = [
    IngredientCategory.SPIRITS,
    IngredientCategory.ADDITIONAL,
  ];

  return (
    <section className="ingredients-section">
      <h2 className={"section-heading"}>Ingredients</h2>
      {categories.map((category) => (
        <IngredientCategoryGroup
          ingredients={drinkIngredientsGroupedByCategory[category] || []}
          category={category}
          key={category}
        />
      ))}
    </section>
  );
};
