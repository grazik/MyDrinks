import { PrismaClient } from "@prisma/client";
import { createPasswordHash } from "@/lib/auth/password";

async function main(prisma: PrismaClient) {
  const passwordHash = await createPasswordHash("asdasd");

  const user = await prisma.user.upsert({
    where: { email: "asd@asd.com" },
    update: {},
    create: {
      email: "asd@asd.com",
      passwordHash,
      name: "Test User",
      role: "CUSTOMER",
    },
  });

  console.log("Seeded user:", user.email);
}

export { main };

if (process.argv[1]?.endsWith("seed_users.ts")) {
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
