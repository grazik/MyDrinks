import { prisma } from "@/db/db";
import { drinkWithIngredients, orderUser } from "@/db/orderIncludes";

export const getUserOrdersForEvent = async (
  userId: string,
  eventId: string,
) => {
  const orders = await prisma.order.findMany({
    where: {
      userId,
      eventId,
    },
    include: {
      drink: true,
    },
  });

  return orders;
};

export const getAllOrdersForEvent = async (eventId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      eventId,
    },
    include: {
      ...drinkWithIngredients,
      ...orderUser,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return orders;
};
