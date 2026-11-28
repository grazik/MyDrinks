import { Order, OrderStatus } from "@prisma/client";
import { DrinkWithAlcoholFlags, isMocktail } from "@/src/utils/drinks/drinks";

const STATUS_TO_TAB = {
  [OrderStatus.PENDING]: "pending",
  [OrderStatus.MIXING]: "mixing",
  [OrderStatus.READY]: "ready",
  [OrderStatus.CANCELLED]: "history",
  [OrderStatus.COMPLETED]: "history",
} as const;

export type OrderTab = (typeof STATUS_TO_TAB)[keyof typeof STATUS_TO_TAB];

export const groupOrdersByTab = <T extends Order>(orders: T[]) => {
  return { ...Object.groupBy(orders, (order) => STATUS_TO_TAB[order.status]) };
};

export enum OrderKind {
  REGULAR = "regular",
  VIRGIN = "virgin",
  MOCKTAIL = "mocktail",
}

type OrderWithAlcoholFlags = Pick<Order, "isVirgin"> & {
  drink: DrinkWithAlcoholFlags;
};

// Mocktail wins over virgin: if a drink's ingredients are later re-marked
// alcohol-free, its old virgin orders would have nothing left to list in
// "Without …".
export const getOrderKind = ({ isVirgin, drink }: OrderWithAlcoholFlags) => {
  if (isMocktail(drink)) return OrderKind.MOCKTAIL;
  if (isVirgin) return OrderKind.VIRGIN;
  return OrderKind.REGULAR;
};

export type GroupedOrders<T extends Order = Order> = Partial<
  Record<OrderTab, T[]>
>;
