import { Client } from "pg";
import { ALL_CHANNELS } from "@/lib/realtime/channels";
import { emitBarUpdate } from "./emitter";
import { NotifyEvent, NotifyPayload } from "@/lib/sse/types";
import { getOrderByIdWithUserAndIngredients } from "@/db/getOrders";

const globalForListener = globalThis as unknown as {
  pgListenerReady?: Promise<void>;
};

const createListener = async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });

  client.on("error", (err) => {
    console.error("[pgListener] connection error", err);
  });

  client.on("notification", async (msg) => {
    if (!msg.payload) return;
    try {
      const { notifyType, data }: NotifyPayload = JSON.parse(msg.payload);
      switch (notifyType) {
        case NotifyEvent.CREATE_ORDER:
        case NotifyEvent.UPDATE_ORDER: {
          // Enrich once per NOTIFY; every subscriber gets the same object so
          // the SSE routes never re-query the DB per connection.
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
};

export const ensurePgListener = (): Promise<void> => {
  if (!globalForListener.pgListenerReady) {
    globalForListener.pgListenerReady = createListener().catch((err) => {
      // Reset so a later request retries instead of caching a failed init.
      globalForListener.pgListenerReady = undefined;
      throw err;
    });
  }
  return globalForListener.pgListenerReady;
};
