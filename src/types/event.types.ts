import { Prisma } from "@prisma/client";

export type ActiveEventWithDrinkIds = Prisma.EventGetPayload<{
  include: { eventDrink: { select: { drinkId: true } } };
}>;
