import { getIngredientsByDrinkId } from "../../../../../db/getDrinkIngredients";
import { IngredientCategory } from "@/src/constants/IngredientCategory";

type IngredientCategoryGroupProps = {
  ingredients: Awaited<ReturnType<typeof getIngredientsByDrinkId>>;
  category: IngredientCategory;
};

export const IngredientCategoryGroup = ({
  ingredients,
  category,
}: IngredientCategoryGroupProps) => {
  return (
    <div className="ingredients-section__group">
      <h3 className={"subsection-heading"}>{category}</h3>
    </div>
  );
};
