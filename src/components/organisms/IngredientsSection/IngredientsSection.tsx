import { getIngredientsByDrinkId } from "../../../../db/getDrinkIngredients";
import "./ingredients-section.scss";

type IngredientsSectionProps = {
  drinkId: string;
};

export const IngredientsSection = async ({
  drinkId,
}: IngredientsSectionProps) => {
  const ingredients = await getIngredientsByDrinkId(drinkId);

  return (
    <section className="ingredients-section">
      <h2 className={"section-heading"}>Ingredients</h2>
      <ul className="ingredients-section__list">
        {ingredients.map(({ name, id, amount, unit }) => (
          <li key={id} className="ingredients-section__list-item body-text">
            <p>{name}</p>
            <p className="body-text--dark">
              {amount} {unit}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};
