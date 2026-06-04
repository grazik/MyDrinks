import { OrderStatus } from "@prisma/client";

export const ORDER_ERRORS = {
  invalidData: "Something looks off with that order. Please try again.",
  unauthorized: "Please sign in to place an order.",
  noActiveEvent: "The bar is closed right now — no event is active.",
  noDrinkInActiveEvent: "This drink isn't on tonight's menu.",
  notFound: "We couldn't find that order.",
  notCancellable: "This order can no longer be cancelled.",
  forbidden: "You don't have permission to update this order.",
  invalidTransition: "That status change isn't allowed for this order.",
};

/** Legal status transitions per current status — the authoritative order state machine. The server guards every status write against it; the bartender UI is the intended consumer too. Exhaustive `Record` so adding an `OrderStatus` forces an entry here. */
export const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [OrderStatus.MIXING, OrderStatus.CANCELLED],
  [OrderStatus.MIXING]: [OrderStatus.READY, OrderStatus.CANCELLED],
  [OrderStatus.READY]: [OrderStatus.COMPLETED, OrderStatus.CANCELLED],
  [OrderStatus.COMPLETED]: [],
  [OrderStatus.CANCELLED]: [],
};
