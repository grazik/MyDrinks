import { prisma } from "@/db/db";
import { Prisma } from "@prisma/client";
import { Channel, OrderEvent } from "@/lib/realtime/channels";
import { NotifyEvent } from "@/lib/sse/types";

export const notify = <T>({
  operation,
  channels,
  getPayload,
  type,
}: {
  operation: (tx: Prisma.TransactionClient) => Promise<T>;
  channels: readonly Channel[];
  getPayload: (result: T) => OrderEvent;
  type: NotifyEvent;
}): Promise<T> =>
  prisma.$transaction(async (tx) => {
    const result = await operation(tx);
    const serialized = JSON.stringify({
      notifyType: type,
      data: getPayload(result),
    });

    for (const channel of channels) {
      await tx.$executeRaw`SELECT pg_notify(${channel}, ${serialized})`;
    }

    return result;
  });
