import {
  OrderWithDrink,
  OrderWithDrinkWithIngredientsAndUser,
} from "@/src/types/order.types";
import { ActiveEventWithDrinkIds } from "@/src/types/event.types";
import { OrderEvent } from "@/lib/realtime/channels";

export enum NotifyEvent {
  CREATE_ORDER = "create_order",
  UPDATE_ORDER = "update_order",
  // String values are the wire discriminant and MUST match the payload emitted
  // by the DB trigger in prisma/sql/bar_status_trigger.sql.
  BAR_OPENED = "bar_opened",
  BAR_CLOSED = "bar_closed",
}

type CreateOrderNotifyPayload = {
  notifyType: NotifyEvent.CREATE_ORDER;
  data: OrderEvent;
};

type UpdateOrderNotifyPayload = {
  notifyType: NotifyEvent.UPDATE_ORDER;
  data: OrderEvent;
};

type BarNotifyPayload = {
  notifyType: NotifyEvent.BAR_OPENED | NotifyEvent.BAR_CLOSED;
  data: { eventId: string };
};

export type NotifyPayload =
  | CreateOrderNotifyPayload
  | UpdateOrderNotifyPayload
  | BarNotifyPayload;

// Carries the fully-enriched record so subscribers read from the bus; the
// listener fetches once per NOTIFY rather than each connection re-querying.
type OrderBarUpdate = {
  type: NotifyEvent.CREATE_ORDER | NotifyEvent.UPDATE_ORDER;
  order: OrderWithDrinkWithIngredientsAndUser;
};

type BarOpenedUpdate = {
  type: NotifyEvent.BAR_OPENED;
  event: ActiveEventWithDrinkIds;
};

type BarClosedUpdate = {
  type: NotifyEvent.BAR_CLOSED;
  event: null;
};

export type BarUpdate = OrderBarUpdate | BarOpenedUpdate | BarClosedUpdate;

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
