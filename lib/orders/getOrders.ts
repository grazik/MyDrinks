import { Event } from "@prisma/client";
import { getUserDto } from "@/lib/auth/getUserDto";
import { getUserOrdersForEvent } from "@/db/getOrders";

export const getCurrentUserOrdersForEvent = async (event: Event) => {
  const userDto = await getUserDto();

  if (!userDto) {
    return null; // Should never reach here — auth middleware guards this route
  }

  return getUserOrdersForEvent(userDto, event);
};
