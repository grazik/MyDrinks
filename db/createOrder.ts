import { Prisma } from "@prisma/client";
import { notify } from "@/db/notify";
import {
  ORDERS_BARTENDER_CHANNEL,
  ORDERS_CUSTOMER_CHANNEL,
} from "@/lib/realtime/channels";
import { NotifyEvent } from "@/lib/sse/types";

type CreateOrderInput = Pick<
  Prisma.OrderUncheckedCreateInput,
  "quantity" | "drinkId" | "userId" | "eventId"
>;

export const createOrder = async (input: CreateOrderInput) => {
  return notify({
    type: NotifyEvent.CREATE_ORDER,
    operation: (tx) => tx.order.create({ data: input }),
    channels: [ORDERS_CUSTOMER_CHANNEL, ORDERS_BARTENDER_CHANNEL],
    getPayload: ({ id }) => ({ orderId: id }),
  });
};
