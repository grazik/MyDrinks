"use server";

import { z } from "zod";
import { OrderStatus } from "@prisma/client";
import { getOrderById } from "@/db/getOrders";
import { setOrderStatus } from "@/db/updateOrder";
import { getUserDto } from "@/lib/auth/getUserDto";
import { ORDER_ERRORS } from "@/src/constants/order";
import type { ActionResult } from "@/src/types/generic.types";

/** Customer self-service cancellation. Bartenders cancel via updateOrderStatus(id, CANCELLED). */
export const cancelOwnOrder = async (
  orderId: string,
): Promise<ActionResult> => {
  const user = await getUserDto();

  if (!user) {
    return { ok: false, message: ORDER_ERRORS.unauthorized };
  }

  const parsedId = z.uuid().safeParse(orderId);

  if (!parsedId.success) {
    return { ok: false, message: ORDER_ERRORS.invalidData };
  }

  const order = await getOrderById(parsedId.data);

  if (!order || order.userId !== user.sub) {
    return { ok: false, message: ORDER_ERRORS.notFound };
  }

  if (order.status !== OrderStatus.PENDING) {
    return { ok: false, message: ORDER_ERRORS.notCancellable };
  }

  await setOrderStatus(order.id, OrderStatus.CANCELLED);

  return { ok: true };
};
