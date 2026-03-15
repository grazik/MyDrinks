import { Order, OrderStatus } from "@prisma/client";

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

export type GroupedOrders<T extends Order = Order> = Partial<
  Record<OrderTab, T[]>
>;
