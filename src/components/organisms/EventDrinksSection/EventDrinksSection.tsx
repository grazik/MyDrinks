import { Drink } from "@prisma/client";
import { EventDrink } from "../EventDrink/EventDrink";
import "./event-drinks-section.scss";

type EventDrinksSectionProps = { drinks: Drink[] };

export const EventDrinksSection = ({ drinks }: EventDrinksSectionProps) => {
  return (
    <section className="event-drinks-section">
      <h2 className="section-heading mt-4">Cocktails in this event</h2>
      <div className="event-drinks">
        {drinks.map((drink) => (
          <EventDrink drink={drink} key={drink.id} />
        ))}
      </div>
    </section>
  );
};
