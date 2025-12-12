import { prisma } from "../../../../db/db";
import "./drinks-grid.scss";
import { DrinksGridClient } from "@/src/components/organisms/DrinksGrid/DrinksGridClient";

export const DrinksGrid = async () => {
  const drinksWithIngredients = await prisma.drink.findMany({
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  return (
    <section className="drinks-grid">
      <DrinksGridClient drinksWithIngredients={drinksWithIngredients} />
    </section>
  );
};
