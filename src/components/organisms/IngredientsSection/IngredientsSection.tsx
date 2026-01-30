import { getIngredientsByDrinkId } from "../../../../db/getDrinkIngredients";
import "./ingredients-section.scss";
import {
  H2SectionHeading,
  SectionHeadingType,
} from "@/src/components/atoms/SectionHeading/SectionHeading";

type IngredientsSectionProps = {
  Heading?: SectionHeadingType;
  drinkId: string;
};

export const IngredientsSection = async ({
  drinkId,
  Heading = H2SectionHeading,
}: IngredientsSectionProps) => {
  const ingredients = await getIngredientsByDrinkId(drinkId);

  return (
    <section className="ingredients-section">
      <Heading>Ingredients</Heading>
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
