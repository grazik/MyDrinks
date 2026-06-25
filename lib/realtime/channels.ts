// Postgres LISTEN/NOTIFY contract shared by the publisher (db/notify.ts) and
// the subscriber (lib/sse/). Dependency-free on purpose: importing this must
// not pull in pg or the EventEmitter.

export const ORDERS_CUSTOMER_CHANNEL = "orders_customer";
export const ORDERS_BARTENDER_CHANNEL = "orders_bartender";

// Single source of truth for the channel list, shared by publisher and
// subscriber so adding a channel can't leave one side out of sync.
export const ALL_CHANNELS = [
  ORDERS_CUSTOMER_CHANNEL,
  ORDERS_BARTENDER_CHANNEL,
] as const;

export type Channel = (typeof ALL_CHANNELS)[number];

export type OrderEvent = {
  orderId: string;
};
