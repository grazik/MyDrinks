import { OrderStatus } from "@prisma/client";
import { notify } from "@/db/notify";
import {
  ORDERS_BARTENDER_CHANNEL,
  ORDERS_CUSTOMER_CHANNEL,
} from "@/lib/realtime/channels";

export const setOrderStatus = (orderId: string, status: OrderStatus) =>
  notify(
    (tx) => tx.order.update({ where: { id: orderId }, data: { status } }),
    [ORDERS_CUSTOMER_CHANNEL, ORDERS_BARTENDER_CHANNEL],
    () => ({ orderId }),
  );
