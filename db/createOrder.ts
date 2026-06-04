import { Prisma } from "@prisma/client";
import { prisma } from "@/db/db";

type CreateOrderInput = Pick<
  Prisma.OrderUncheckedCreateInput,
  "quantity" | "drinkId" | "userId" | "eventId"
>;

export const createOrder = async (input: CreateOrderInput) => {
  return prisma.order.create({
    data: input,
  });
};
