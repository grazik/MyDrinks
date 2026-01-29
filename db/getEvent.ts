import { prisma } from "@/db/db";

export const getEventBySlug = async (slug: string) => {
  const event = await prisma.event.findFirst({
    where: {
      slug,
    },
  });

  return event;
};

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
