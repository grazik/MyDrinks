import { OrderStatus } from "@prisma/client";
import { prisma } from "@/db/db";

export const setOrderStatus = async (orderId: string, status: OrderStatus) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};
