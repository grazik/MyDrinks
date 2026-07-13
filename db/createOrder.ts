import { Prisma } from "@prisma/client";
import { notify } from "@/db/notify";
import {
  ORDERS_BARTENDER_CHANNEL,
  ORDERS_CUSTOMER_CHANNEL,
} from "@/lib/realtime/channels";

type CreateOrderInput = Pick<
  Prisma.OrderUncheckedCreateInput,
  "quantity" | "drinkId" | "userId" | "eventId"
>;

export const createOrder = async (input: CreateOrderInput) => {
  return notify(
    (tx) => tx.order.create({ data: input }),
    [ORDERS_CUSTOMER_CHANNEL, ORDERS_BARTENDER_CHANNEL],
    ({ id }) => ({ orderId: id }),
  );
};
