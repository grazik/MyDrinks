import { Drink } from "@prisma/client";
import "./drink-card.scss";

type DrinkCardProps = {
  drink: Drink;
};

export const DrinkCard = ({ drink }: DrinkCardProps) => {
  return (
    <div className={"drink-card"}>
      <a href={drink.slug} className="drink-card__link">
        <img className={"drink-card__image"} src={drink.image} />
        <p className="drink-card__title card-title">{drink.name}</p>
      </a>
    </div>
  );
};
