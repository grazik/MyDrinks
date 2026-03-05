import { PrismaClient } from "@prisma/client";
import { main as seedDrinks } from "./seed_drinks";
import { main as seedEvents } from "./seed_events";
import { main as seedUsers } from "./seed_users";
import { main as seedOrders } from "./seed_orders";

const prisma = new PrismaClient();

async function main() {
  console.log("Running drinks seed...");
  await seedDrinks(prisma);

  console.log("Running events seed...");
  await seedEvents(prisma);

  console.log("Running users seed...");
  await seedUsers(prisma);

  console.log("Running orders seed...");
  await seedOrders(prisma);

  console.log("All seeds completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
