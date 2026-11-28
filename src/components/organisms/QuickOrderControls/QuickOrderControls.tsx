import { Drink } from "@prisma/client";
import { getUserDto } from "@/lib/auth/getUserDto";
import { getActiveEventWithDrinkIds } from "@/db/getEvent";
import { getIngredientsByDrinkId } from "@/db/getDrinkIngredients";
import { QuickOrderControlsClient } from "./QuickOrderControlsClient";
import { orderDrink } from "@/src/actions/orderDrink";
import {
  getAlcoholicIngredientNames,
  isVirginAvailable,
} from "@/src/utils/drinks/drinks";

interface QuickOrderControlsProps {
  drink: Pick<Drink, "id" | "isVirginAllowed">;
}

export const QuickOrderControls = async ({
  drink: { id: drinkId, isVirginAllowed },
}: QuickOrderControlsProps) => {
  const [user, event, ingredients] = await Promise.all([
    getUserDto(),
    getActiveEventWithDrinkIds(),
    getIngredientsByDrinkId(drinkId),
  ]);

  if (!user || !event) return null;

  const isAvailable = event.eventDrink.some((ed) => ed.drinkId === drinkId);

  return (
    <QuickOrderControlsClient
      isAvailable={isAvailable}
      isVirginAvailable={isVirginAvailable({ isVirginAllowed, ingredients })}
      omittedIngredientNames={getAlcoholicIngredientNames({ ingredients })}
      onOrder={async (quantity, isVirgin) => {
        "use server";
        return orderDrink({
          drinkId,
          quantity,
          isVirgin,
        });
      }}
    />
  );
};
