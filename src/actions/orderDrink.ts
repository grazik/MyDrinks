"use server";

import { orderDtoSchema } from "@/lib/dto/order";
import { ORDER_ERRORS } from "@/src/constants/order";
import { getUserDto } from "@/lib/auth/getUserDto";
import { createOrder } from "@/db/createOrder";
import { getActiveEventWithDrinkIds } from "@/db/getEvent";
import { getDrinkVirginFlags } from "@/db/getDrink";
import { isVirginAvailable } from "@/src/utils/drinks/drinks";
import { z } from "zod";
import type { ActionResult } from "@/src/types/generic.types";

export const orderDrink = async (
  data: z.infer<typeof orderDtoSchema>,
): Promise<ActionResult> => {
  const user = await getUserDto();

  if (!user) {
    return {
      ok: false,
      message: ORDER_ERRORS.unauthorized,
    };
  }

  const parsedData = orderDtoSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      ok: false,
      message: ORDER_ERRORS.invalidData,
    };
  }

  const activeEvent = await getActiveEventWithDrinkIds();

  if (!activeEvent) {
    return {
      ok: false,
      message: ORDER_ERRORS.noActiveEvent,
    };
  }

  const { quantity, drinkId, isVirgin } = parsedData.data;

  if (
    !activeEvent.eventDrink.find((eventDrink) => eventDrink.drinkId === drinkId)
  ) {
    return {
      ok: false,
      message: ORDER_ERRORS.noDrinkInActiveEvent,
    };
  }

  if (isVirgin) {
    const drink = await getDrinkVirginFlags(drinkId);

    if (!drink || !isVirginAvailable(drink)) {
      return {
        ok: false,
        message: ORDER_ERRORS.virginNotAvailable,
      };
    }
  }

  await createOrder({
    quantity,
    isVirgin,
    drinkId,
    userId: user.sub,
    eventId: activeEvent.id,
  });

  return {
    ok: true,
  };
};
