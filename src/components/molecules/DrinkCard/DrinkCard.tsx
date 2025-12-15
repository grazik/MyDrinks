import { Drink } from "@prisma/client";
import "./drink-card.scss";
import Link from "next/link";

type DrinkCardProps = {
  drink: Drink;
};

export const DrinkCard = ({ drink }: DrinkCardProps) => {
  return (
    <div className={"drink-card"}>
      <Link href={drink.slug} className="drink-card__link">
        <div className="drink-card__image-wrapper">
          {drink.image && (
            <img className={"drink-card__image"} src={drink.image} />
          )}
        </div>
        <p className="drink-card__title card-title">{drink.name}</p>
      </Link>
    </div>
  );
};
