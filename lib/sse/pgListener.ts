import { Client } from "pg";
import { ALL_CHANNELS } from "@/lib/realtime/channels";
import { emitOrderEvent } from "./emitter";

const globalForListener = globalThis as unknown as {
  pgListenerReady?: Promise<void>;
};

const createListener = async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });

  client.on("error", (err) => {
    console.error("[pgListener] connection error", err);
  });

  client.on("notification", (msg) => {
    if (!msg.payload) return;
    try {
      emitOrderEvent(msg.channel, JSON.parse(msg.payload));
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
