import { Drink } from "@prisma/client";
import "./drink-card.scss";
import Link from "next/link";
import { Tag } from "@/src/components/atoms/tag/Tag";
import tokens from "@/src/styles/tokens.module.scss";

type DrinkCardProps = {
  drink: Drink;
  isMocktail?: boolean;
};

export const DrinkCard = ({ drink, isMocktail = false }: DrinkCardProps) => {
  return (
    <div className={"drink-card"}>
      <Link href={drink.slug} className="drink-card__link">
        <div className="drink-card__image-wrapper">
          {drink.image && (
            <img className={"drink-card__image"} src={drink.image} />
          )}
          {isMocktail && (
            <span className="drink-card__badge">
              <Tag
                title="Mocktail"
                bgColor={tokens.colorIceAqua}
                color={tokens.colorBackground}
              />
            </span>
          )}
        </div>
        <p className="drink-card__title card-title">{drink.name}</p>
      </Link>
    </div>
  );
};
