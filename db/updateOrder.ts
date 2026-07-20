import { OrderStatus } from "@prisma/client";
import { notify } from "@/db/notify";
import {
  ORDERS_BARTENDER_CHANNEL,
  ORDERS_CUSTOMER_CHANNEL,
} from "@/lib/realtime/channels";
import { NotifyEvent } from "@/lib/sse/types";

export const setOrderStatus = (orderId: string, status: OrderStatus) =>
  notify({
    type: NotifyEvent.UPDATE_ORDER,
    operation: (tx) =>
      tx.order.update({ where: { id: orderId }, data: { status } }),
    channels: [ORDERS_CUSTOMER_CHANNEL, ORDERS_BARTENDER_CHANNEL],
    getPayload: () => ({ orderId }),
  });
