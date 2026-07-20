import { EventEmitter } from "node:events";
import { Channel, OrderEvent } from "@/lib/realtime/channels";

const globalForEmitter = globalThis as unknown as {
  orderEmitter?: EventEmitter;
};

/**
 * In-process event bus. The pg listener re-emits Postgres NOTIFY payloads onto
 * this emitter; SSE route handlers subscribe to it per connection.
 */
const orderEmitter = globalForEmitter.orderEmitter ?? new EventEmitter();

// Each open SSE connection adds a listener, so lift the default 10-listener cap
// to avoid spurious MaxListenersExceededWarning under normal load.
orderEmitter.setMaxListeners(0);

export const subscribeToOrderEmitter = (
  channel: Channel,
  handler: (payload: OrderEvent) => void,
) => {
  orderEmitter.on(channel, handler);

  return () => {
    orderEmitter.off(channel, handler);
  };
};

export const emitOrderEvent = (channel: string, payload: OrderEvent) =>
  orderEmitter.emit(channel, payload);

if (process.env.NODE_ENV !== "production") {
  globalForEmitter.orderEmitter = orderEmitter;
}
