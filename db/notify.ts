import { prisma } from "@/db/db";
import { PrismaPromise } from "@prisma/client";
import { Channel, OrderEvent } from "@/lib/realtime/channels";

export const notify = <T>(
  operation: PrismaPromise<T>,
  channels: readonly Channel[],
  payload: OrderEvent,
) => {
  const serialized = JSON.stringify(payload);
  return prisma.$transaction([
    operation,
    ...channels.map(
      (channel) =>
        prisma.$executeRaw`SELECT pg_notify(${channel}, ${serialized})`,
    ),
  ]);
};
