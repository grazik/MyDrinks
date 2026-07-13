import { OrderWithDrinkWithIngredientsAndUser } from "@/src/types/order.types";

export enum BarEvent {
  ORDER_UPDATED = "order_updated",
  ALL_ORDERS = "all_orders",
  BAR_CLOSED = "bar_closed",
}

export type BarEventPayloads = {
  [BarEvent.ALL_ORDERS]: OrderWithDrinkWithIngredientsAndUser[];
  [BarEvent.ORDER_UPDATED]: OrderWithDrinkWithIngredientsAndUser;
  [BarEvent.BAR_CLOSED]: null;
};
