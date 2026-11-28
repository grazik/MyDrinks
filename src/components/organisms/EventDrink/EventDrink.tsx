import { Drink } from "@prisma/client";
import Image from "next/image";
import "./event-drink.scss";
import { IngredientsSection } from "@/src/components/organisms/IngredientsSection/IngredientsSection";
import { QuickOrderControls } from "@/src/components/organisms/QuickOrderControls/QuickOrderControls";
import Link from "next/link";
import { H3SectionHeading } from "@/src/components/atoms/SectionHeading/SectionHeading";
import { Tag } from "@/src/components/atoms/tag/Tag";
import { VirginOrderProvider } from "@/src/contexts/VirginOrderContext/VirginOrderProvider";
import { getIngredientsByDrinkId } from "@/db/getDrinkIngredients";
import { isMocktail } from "@/src/utils/drinks/drinks";
import tokens from "@/src/styles/tokens.module.scss";

interface EventDrinkProps {
  drink: Drink;
}

export const EventDrink = async ({ drink }: EventDrinkProps) => {
  const ingredients = await getIngredientsByDrinkId(drink.id);

  return (
    <div className="event-drink">
      <div className="event-drink__section">
        <Link href={drink.slug} className="event-drink__link">
          <h3 className="subsection-heading">{drink.name}</h3>
          {isMocktail({ ingredients }) && (
            <Tag
              title="Mocktail · alcohol-free"
              bgColor={tokens.colorIceAqua}
              variant="subtle"
            />
          )}
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
        <VirginOrderProvider>
          <IngredientsSection Heading={H3SectionHeading} drink={drink} />
          <QuickOrderControls drink={drink} />
        </VirginOrderProvider>
      </div>
    </div>
  );
};
