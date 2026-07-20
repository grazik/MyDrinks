import {
  OrderWithDrink,
  OrderWithDrinkWithIngredientsAndUser,
} from "@/src/types/order.types";
import { OrderEvent } from "@/lib/realtime/channels";

export enum NotifyEvent {
  CREATE_ORDER = "create_order",
  UPDATE_ORDER = "update_order",
}

type CreateOrderNotifyPayload = {
  notifyType: NotifyEvent.CREATE_ORDER;
  data: OrderEvent;
};

type UpdateOrderNotifyPayload = {
  notifyType: NotifyEvent.UPDATE_ORDER;
  data: OrderEvent;
};

export type NotifyPayload = CreateOrderNotifyPayload | UpdateOrderNotifyPayload;

// Enriched in-process bus message. The pg listener re-fetches the full order
// once per NOTIFY and broadcasts this to every subscriber, so SSE routes filter
// in memory instead of re-querying the DB per connection.
export type BarUpdate = {
  type: NotifyEvent.CREATE_ORDER | NotifyEvent.UPDATE_ORDER;
  order: OrderWithDrinkWithIngredientsAndUser;
};

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
