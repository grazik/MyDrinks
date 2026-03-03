import { Event } from "@prisma/client";
import { UserDto } from "@/lib/dto/user";
import { cache } from "react";
import { prisma } from "@/db/db";

export const getUserOrdersForEvent = cache(
  async (user: UserDto, event: Event) => {
    const orders = await prisma.order.findMany({
      where: {
        userId: user.sub,
        eventId: event.id,
      },
      include: {
        drink: true,
      },
    });

    return orders;
  },
);
