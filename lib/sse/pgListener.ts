import { Client } from "pg";
import { ALL_CHANNELS } from "@/lib/realtime/channels";
import { emitBarUpdate } from "./emitter";
import { NotifyEvent, NotifyPayload } from "@/lib/sse/types";
import { getOrderByIdWithUserAndIngredients } from "@/db/getOrders";
import { getActiveEventWithDrinkIdsFresh } from "@/db/getEvent";

const globalForListener = globalThis as unknown as {
  pgListenerReady?: Promise<void>;
  pgListenerHasConnected?: boolean;
};

const RECONNECT_BASE_DELAY_MS = 1_000;
const RECONNECT_MAX_DELAY_MS = 30_000;

const createListener = async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });

  // A replaced client's late errors must not reset global state again — that
  // would orphan the healthy replacement and spawn a duplicate listener.
  let isReplaced = false;
  client.on("error", (err) => {
    if (isReplaced) return;
    isReplaced = true;

    console.error("[pgListener] connection lost; scheduling reconnect", err);
    client.end().catch(() => {});
    globalForListener.pgListenerReady = undefined;
    scheduleReconnect();
  });

  client.on("notification", async (msg) => {
    if (!msg.payload) return;
    try {
      const { notifyType, data }: NotifyPayload = JSON.parse(msg.payload);
      switch (notifyType) {
        case NotifyEvent.CREATE_ORDER:
        case NotifyEvent.UPDATE_ORDER: {
          const order = await getOrderByIdWithUserAndIngredients(data.orderId);

          if (!order) {
            console.error(
              `[pgListener] order not found for ${notifyType}: ${data.orderId}`,
            );
            break;
          }

          emitBarUpdate(msg.channel, { type: notifyType, order });
          break;
        }

        case NotifyEvent.BAR_OPENED: {
          const event = await getActiveEventWithDrinkIdsFresh();

          if (!event) {
            console.error(
              `[pgListener] bar opened but no active event found: ${data.eventId}`,
            );
            break;
          }

          emitBarUpdate(msg.channel, { type: notifyType, event });
          break;
        }

        case NotifyEvent.BAR_CLOSED:
          emitBarUpdate(msg.channel, { type: notifyType, event: null });
          break;

        default:
          console.error(`[pgListener] notify type not handled, ${notifyType}`);
          notifyType satisfies never;
      }
    } catch (err) {
      console.error(
        `[pgListener] failed to parse payload on ${msg.channel}`,
        err,
      );
    }
  });

  await client.connect();

  await Promise.all(
    ALL_CHANNELS.map((channel) => client.query(`LISTEN ${channel}`)),
  );

  // NOTIFYs fired while the listener was down are lost for good; subscribers
  // must rebuild their state from the DB instead of trusting the stream.
  if (globalForListener.pgListenerHasConnected) {
    console.log("[pgListener] reconnected; broadcasting resync");
    for (const channel of ALL_CHANNELS) {
      emitBarUpdate(channel, { type: NotifyEvent.RESYNC });
    }
  }
  globalForListener.pgListenerHasConnected = true;
};

const scheduleReconnect = (attempt = 0) => {
  const delay = Math.min(
    RECONNECT_BASE_DELAY_MS * 2 ** attempt,
    RECONNECT_MAX_DELAY_MS,
  );

  setTimeout(() => {
    ensurePgListener().catch((err) => {
      console.error(
        `[pgListener] reconnect attempt ${attempt + 1} failed`,
        err,
      );
      scheduleReconnect(attempt + 1);
    });
  }, delay);
};

export const ensurePgListener = (): Promise<void> => {
  if (!globalForListener.pgListenerReady) {
    globalForListener.pgListenerReady = createListener().catch((err) => {
      // Reset so a later request retries instead of caching a failed init.
      console.error("[pgListener] couldn't create a listener", err);
      globalForListener.pgListenerReady = undefined;
      throw err;
    });
  }
  return globalForListener.pgListenerReady;
};
