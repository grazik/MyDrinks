import {
  OrderWithDrink,
  OrderWithDrinkWithIngredientsAndUser,
} from "@/src/types/order.types";

export enum BarEvent {
  ORDER_UPDATED = "order_updated",
  ALL_ORDERS = "all_orders",
  USER_ALL_ORDERS = "user_all_orders",
  USER_ORDER_UPDATED = "user_order_updated",
  BAR_CLOSED = "bar_closed",
}

type SatisfiesAllEvents<T extends Record<BarEvent, unknown>> = T;

export type BarEventPayloads = SatisfiesAllEvents<{
  [BarEvent.ALL_ORDERS]: OrderWithDrinkWithIngredientsAndUser[];
  [BarEvent.ORDER_UPDATED]: OrderWithDrinkWithIngredientsAndUser;
  [BarEvent.USER_ALL_ORDERS]: OrderWithDrink[];
  [BarEvent.USER_ORDER_UPDATED]: OrderWithDrink;
  [BarEvent.BAR_CLOSED]: null;
}>;
