import { cache } from "react";
import { prisma } from "@/db/db";

export const getEventBySlug = async (slug: string) => {
  const event = await prisma.event.findFirst({
    where: {
      slug,
    },
  });

  return event;
};

const findActiveEventWithDrinkIds = () =>
  prisma.event.findFirst({
    where: {
      status: "ACTIVE",
    },
    include: {
      eventDrink: {
        select: {
          drinkId: true,
        },
      },
    },
  });

export const getActiveEventWithDrinkIds = cache(findActiveEventWithDrinkIds);

// The pg listener is long-lived and runs outside a request scope; wrapping this
// in cache() would pin the first result and serve a stale event thereafter.
export const getActiveEventWithDrinkIdsFresh = findActiveEventWithDrinkIds;

export const getActiveEvent = cache(async () => {
  const event = await prisma.event.findFirst({
    where: {
      status: "ACTIVE",
    },
  });

  return event;
});

export const getEventWithDrinksBySlug = async (slug: string) => {
  const event = await prisma.event.findUnique({
    where: {
      slug,
    },
    include: {
      eventDrink: {
        include: {
          drink: true,
        },
      },
    },
  });

  return event;
};
