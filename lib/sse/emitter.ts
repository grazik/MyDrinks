import { EventEmitter } from "node:events";
import { Channel } from "@/lib/realtime/channels";
import { BarUpdate } from "./types";

const globalForEmitter = globalThis as unknown as {
  barEmitter?: EventEmitter;
};

/**
 * In-process event bus. The pg listener re-emits enriched Postgres NOTIFY
 * payloads onto this emitter; SSE route handlers subscribe to it per connection.
 */
const barEmitter = globalForEmitter.barEmitter ?? new EventEmitter();

// Each open SSE connection adds a listener, so lift the default 10-listener cap
// to avoid spurious MaxListenersExceededWarning under normal load.
barEmitter.setMaxListeners(0);

export const subscribeToBarUpdates = (
  channel: Channel,
  handler: (update: BarUpdate) => void,
) => {
  barEmitter.on(channel, handler);

  return () => {
    barEmitter.off(channel, handler);
  };
};

export const emitBarUpdate = (channel: string, update: BarUpdate) =>
  barEmitter.emit(channel, update);

if (process.env.NODE_ENV !== "production") {
  globalForEmitter.barEmitter = barEmitter;
}
