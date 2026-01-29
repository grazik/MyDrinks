import { Drink } from "@prisma/client";
import Image from "next/image";
import "./event-drink.scss";
import { IngredientsSection } from "@/src/components/organisms/IngredientsSection/IngredientsSection";

interface EventDrinkProps {
  drink: Drink;
}

export const EventDrink = ({ drink }: EventDrinkProps) => {
  return (
    <div className="event-drink">
      <div className="event-drink__section">
        {drink.image && (
          <Image
            className={"event-drink__image"}
            src={drink.image}
            alt=""
            width={683}
            height={1024}
          />
        )}
        <h3 className="subsection-heading">{drink.name}</h3>
      </div>

      <div className="event-drink__section">
        <IngredientsSection drinkId={drink.id} />
      </div>
    </div>
  );
};
