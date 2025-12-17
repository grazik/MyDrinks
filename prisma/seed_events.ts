// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Halloween 2025 Event
  const halloween = await prisma.event.create({
    data: {
      title: "Halloween 2025",
      description:
        "Spooky cocktails for your Halloween party. Dark, mysterious, and delicious drinks to set the perfect eerie atmosphere.",
      eventDate: new Date("2025-10-31T20:00:00Z"),
      image: "/images/events/Halloween_2025/halloween.jpg",
      eventDrink: {
        create: [
          { drinkId: "76b99174-bfe0-456f-85e8-ec86e45e9779" }, // White Russian
          { drinkId: "1c6cadab-29ff-467c-bb04-168dc7659063" }, // Espresso Martini
          { drinkId: "97e14463-5288-4cb0-b738-142d9bbef573" }, // Bloody Mary
          { drinkId: "3600e6fc-82f5-4360-b448-e623a15bdb9b" }, // Zombie
          { drinkId: "d060ffee-5ddd-43f4-bbed-9a6613018986" }, // Boulevardier
          { drinkId: "21a49ee8-3d7b-4682-a105-846bda172402" }, // Bramble
          { drinkId: "b4c915ca-e5e2-47c0-8ac8-8210ebf5811e" }, // Corpse Reviver No.2
        ],
      },
    },
  });

  // Christmas 2025 Event
  const christmas = await prisma.event.create({
    data: {
      title: "Christmas 2025",
      description:
        "Festive cocktails to warm your heart and spread holiday cheer. Perfect drinks for cozy gatherings by the fireplace with family and friends.",
      eventDate: new Date("2025-12-25T18:00:00Z"),
      image: "/images/events/Christmas_2025/christmas.jpg",
      eventDrink: {
        create: [
          { drinkId: "98db8b71-5bbb-4b86-a554-a747a1abb99e" }, // Irish Coffee
          { drinkId: "fd5fa39a-bb5f-4baf-b23d-e56161cc3d32" }, // Whisky Old Fashioned
          { drinkId: "53f1c478-ca77-4322-bdce-d310e7b99e36" }, // Manhattan
          { drinkId: "1c5985df-e031-44ff-8cdd-a55b12c93b07" }, // Negroni
          { drinkId: "25c27bb2-1634-4bd6-8240-a968308f2616" }, // Sazerac
          { drinkId: "0e7093cf-8330-4952-8c5e-ddd57a53646f" }, // Whiskey Sour
          { drinkId: "1916e1b0-06de-4366-a756-c7a1b2d1ae6d" }, // Sidecar
          { drinkId: "c04101a5-4690-4e2f-8968-c55f109134d7" }, // Godfather
        ],
      },
    },
  });

  // New Year's Eve 2025 Event
  const newYears = await prisma.event.create({
    data: {
      title: "New Year's Eve 2025",
      description:
        "Elegant and celebratory cocktails to ring in the new year with style. Sparkling, sophisticated drinks perfect for toasting to new beginnings.",
      eventDate: new Date("2025-12-31T22:00:00Z"),
      image: "/images/events/New_Years_Eve_2025/new_years.jpg",
      eventDrink: {
        create: [
          { drinkId: "9e29e566-ed82-4fd8-b06a-999f546f0f16" }, // French 75
          { drinkId: "72a31860-b547-4f98-873c-459d85a2bdc0" }, // Martini
          { drinkId: "55574a17-f588-4cc8-8f59-124456a3e8c5" }, // Cosmopolitan
          { drinkId: "6fdabe4f-1d52-455d-8771-5ff796b41856" }, // Pornstar Martini
          { drinkId: "9857c481-b606-4bd8-9635-e9b6c16e61c0" }, // Vesper Martini
          { drinkId: "8d9b97f6-decd-4dec-9c8e-1dcf41ddeee0" }, // Aperol Spritz
          { drinkId: "c857f71d-520b-440a-b1af-4ae440e67fdf" }, // Aviation
          { drinkId: "08528cb2-948e-48b0-9e0f-2886a0841bc1" }, // Paper Plane
          { drinkId: "4eccbd20-6143-44b2-8ed7-2664e939695e" }, // Apple Martini
          { drinkId: "dab064ad-762e-43ea-9021-02e0ef45bcaf" }, // French Martini
        ],
      },
    },
  });

  console.log("Seed completed successfully!");
  console.log({ halloween, christmas, newYears });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
