import { Prisma } from "@prisma/client";
import { UnionToIntersection } from "@/src/types/generic.types";

type OrderPayloads = {
  withDrink: Prisma.OrderGetPayload<{ include: { drink: true } }>;
  withUser: Prisma.OrderGetPayload<{
    include: { user: { select: { id: true; name: true } } };
  }>;
};

export type OrderWith<T extends keyof OrderPayloads> = UnionToIntersection<
  OrderPayloads[T]
>;

export { type Order } from "@prisma/client";
export type OrderWithDrink = OrderWith<"withDrink">;
export type OrderWithDrinkAndUser = OrderWith<"withDrink" | "withUser">;
