import { Prisma } from "@prisma/client";
import { UnionToIntersection } from "@/src/types/generic.types";
import { drinkWithIngredients, orderUser } from "@/db/orderIncludes";

type OrderPayloads = {
  withDrink: Prisma.OrderGetPayload<{ include: { drink: true } }>;
  withUser: Prisma.OrderGetPayload<{ include: typeof orderUser }>;
  withDrinkWithIngredients: Prisma.OrderGetPayload<{
    include: typeof drinkWithIngredients;
  }>;
};

export type OrderWith<T extends keyof OrderPayloads> = UnionToIntersection<
  OrderPayloads[T]
>;

export { type Order } from "@prisma/client";
export type OrderWithDrink = OrderWith<"withDrink">;
export type OrderWithDrinkAndUser = OrderWith<"withDrink" | "withUser">;
export type OrderWithDrinkWithIngredientsAndUser = OrderWith<
  "withDrinkWithIngredients" | "withUser"
>;
