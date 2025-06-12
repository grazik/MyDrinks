import { getIngredientsByDrinkId } from "../../../../../db/getDrinkIngredients";
import { IngredientCategory } from "@/constants/IngredientCategory";

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
      <h2 className={"subsection-heading"}>{category}</h2>
      <ul className="ingredients-section__list">
        {ingredients.map(({ name, id, amount, unit }) => (
          <li key={id} className="ingredients-section__list-item body-text">
            <p>{name}</p>
            <p>
              {amount} {unit}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
