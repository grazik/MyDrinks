"use server";

import { OrderStatus } from "@prisma/client";
import { getUserDto } from "@/lib/auth/getUserDto";
import { isStaff } from "@/lib/auth/roles";
import { ORDER_ERRORS } from "@/src/constants/order";
import { getOrderById } from "@/db/getOrders";
import z from "zod";
import { setOrderStatus } from "@/db/updateOrder";
import type { OrderResult } from "@/src/actions/orderDrink";

const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.MIXING, OrderStatus.CANCELLED],
  [OrderStatus.MIXING]: [OrderStatus.READY, OrderStatus.CANCELLED],
  [OrderStatus.READY]: [OrderStatus.COMPLETED, OrderStatus.CANCELLED],
  [OrderStatus.COMPLETED]: [],
  [OrderStatus.CANCELLED]: [],
};

export const updateOrderStatus = async (
  orderId: string,
  orderStatus: OrderStatus,
): Promise<OrderResult> => {
  const user = await getUserDto();

  if (!user || !isStaff(user.role)) {
    return { ok: false, message: ORDER_ERRORS.forbidden };
  }

  const parsedId = z.uuid().safeParse(orderId);
  const parsedStatus = z.enum(OrderStatus).safeParse(orderStatus);

  if (!parsedId.success || !parsedStatus.success) {
    return { ok: false, message: ORDER_ERRORS.invalidData };
  }

  const order = await getOrderById(parsedId.data);

  if (!order) {
    return { ok: false, message: ORDER_ERRORS.notFound };
  }

  if (!ALLOWED_TRANSITIONS[order.status].includes(parsedStatus.data)) {
    return { ok: false, message: ORDER_ERRORS.invalidTransition };
  }

  await setOrderStatus(order.id, parsedStatus.data);

  return { ok: true };
};
