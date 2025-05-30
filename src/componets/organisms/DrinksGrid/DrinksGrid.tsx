import { prisma } from "../../../../lib/db";
import "./drinks-grid.scss";
import { DrinksGridClient } from "@/componets/organisms/DrinksGrid/DrinksGridClient";

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
