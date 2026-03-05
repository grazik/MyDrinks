import { prisma } from "@/db/db";

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
      drink: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return orders;
};
