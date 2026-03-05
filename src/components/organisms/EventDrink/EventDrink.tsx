import { Drink } from "@prisma/client";
import Image from "next/image";
import "./event-drink.scss";
import { IngredientsSection } from "@/src/components/organisms/IngredientsSection/IngredientsSection";
import { QuickOrderControls } from "@/src/components/organisms/QuickOrderControls/QuickOrderControls";
import Link from "next/link";
import { H3SectionHeading } from "@/src/components/atoms/SectionHeading/SectionHeading";

interface EventDrinkProps {
  drink: Drink;
}

export const EventDrink = ({ drink }: EventDrinkProps) => {
  return (
    <div className="event-drink">
      <div className="event-drink__section">
        <Link href={drink.slug} className="event-drink__link">
          <h3 className="subsection-heading">{drink.name}</h3>
          {drink.image && (
            <div className="event-drink__image-wrapper">
              <Image
                className={"event-drink__image"}
                src={drink.image}
                alt=""
                width={1024}
                height={1024}
              />
            </div>
          )}
        </Link>
      </div>

      <div className="event-drink__section">
        <IngredientsSection Heading={H3SectionHeading} drinkId={drink.id} />
        <QuickOrderControls drinkId={drink.id} />
      </div>
    </div>
  );
};
