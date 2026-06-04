"use server";

import { orderDtoSchema } from "@/lib/dto/order";
import { ORDER_ERRORS } from "@/src/constants/order";
import { getUserDto } from "@/lib/auth/getUserDto";
import { createOrder } from "@/db/createOrder";
import { getActiveEventWithDrinkIds } from "@/db/getEvent";
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

  const { quantity, drinkId } = parsedData.data;

  if (
    !activeEvent.eventDrink.find((eventDrink) => eventDrink.drinkId === drinkId)
  ) {
    return {
      ok: false,
      message: ORDER_ERRORS.noDrinkInActiveEvent,
    };
  }

  await createOrder({
    quantity,
    drinkId,
    userId: user.sub,
    eventId: activeEvent.id,
  });

  return {
    ok: true,
  };
};
