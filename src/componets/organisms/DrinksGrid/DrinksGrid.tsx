import { prisma } from "../../../../lib/db";
import { DrinkCard } from "@/componets/molecules/DrinkCard/DrinkCard";
import "./drinks-grid.scss";

export const DrinksGrid = async () => {
  const drinks = await prisma.drink.findMany();

  return (
    <section className="drinks-grid">
      {drinks.map((drink) => (
        <DrinkCard drink={drink} key={drink.id} />
      ))}
    </section>
  );
};
