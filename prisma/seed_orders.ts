import { PrismaClient } from "@prisma/client";

async function main(prisma: PrismaClient) {
  const event = await prisma.event.findUnique({
    where: { slug: "halloween-2025" },
    include: { eventDrink: true },
  });

  if (!event) throw new Error("Halloween 2025 event not found");

  const firstEventDrink = event.eventDrink[0];
  if (!firstEventDrink) throw new Error("No drinks found in halloween-2025 event");

  const user = await prisma.user.findUnique({
    where: { email: "asd@asd.com" },
  });

  if (!user) throw new Error("User asd@asd.com not found");

  const orders = await Promise.all([
    prisma.order.create({
      data: {
        quantity: 1,
        status: "PENDING",
        eventId: event.id,
        drinkId: firstEventDrink.drinkId,
        userId: user.id,
      },
    }),
    prisma.order.create({
      data: {
        quantity: 2,
        status: "MIXING",
        eventId: event.id,
        drinkId: firstEventDrink.drinkId,
        userId: user.id,
      },
    }),
    prisma.order.create({
      data: {
        quantity: 1,
        status: "READY",
        eventId: event.id,
        drinkId: firstEventDrink.drinkId,
        userId: user.id,
      },
    }),
    prisma.order.create({
      data: {
        quantity: 1,
        status: "CANCELLED",
        eventId: event.id,
        drinkId: firstEventDrink.drinkId,
        userId: user.id,
      },
    }),
    prisma.order.create({
      data: {
        quantity: 3,
        status: "COMPLETED",
        eventId: event.id,
        drinkId: firstEventDrink.drinkId,
        userId: user.id,
      },
    }),
  ]);

  console.log(`Seeded ${orders.length} orders for drinkId: ${firstEventDrink.drinkId}`);
}

export { main };

if (process.argv[1]?.endsWith("seed_orders.ts")) {
  const prisma = new PrismaClient();
  main(prisma)
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
