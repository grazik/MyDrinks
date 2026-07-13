import { prisma } from "@/db/db";
import { Prisma } from "@prisma/client";
import { Channel, OrderEvent } from "@/lib/realtime/channels";

export const notify = <T>(
  operation: (tx: Prisma.TransactionClient) => Promise<T>,
  channels: readonly Channel[],
  getPayload: (result: T) => OrderEvent,
): Promise<T> =>
  prisma.$transaction(async (tx) => {
    const result = await operation(tx);
    const serialized = JSON.stringify(getPayload(result));

    for (const channel of channels) {
      await tx.$executeRaw`SELECT pg_notify(${channel}, ${serialized})`;
    }

    return result;
  });
