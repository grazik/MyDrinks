import { EventEmitter } from "node:events";

const globalForEmitter = globalThis as unknown as {
  orderEmitter?: EventEmitter;
};

/**
 * In-process event bus. The pg listener re-emits Postgres NOTIFY payloads onto
 * this emitter; SSE route handlers subscribe to it per connection.
 */
export const orderEmitter = globalForEmitter.orderEmitter ?? new EventEmitter();

// Each open SSE connection adds a listener, so lift the default 10-listener cap
// to avoid spurious MaxListenersExceededWarning under normal load.
orderEmitter.setMaxListeners(0);

if (process.env.NODE_ENV !== "production") {
  globalForEmitter.orderEmitter = orderEmitter;
}
