import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Add Whisky Old Fashioned drink
  const whiskyOldFashioned = await prisma.drink.create({
    data: {
      name: "Whisky Old Fashioned",
      recipe: `1. Stir the **simple syrup**, **water**, and **bitters** in a glass.  
2. Add the **ice cubes** and **bourbon**.  
3. Garnish as desired.`,
      createdAt: new Date("2025-04-07T15:54:00Z"), // Current date
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "whisky" },
                create: { name: "whisky", type: "spirit" },
              },
            },
            amount: 60,
            unit: "ml",
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "Angostura" },
                create: { name: "Angostura", type: "bitter" },
              },
            },
            amount: 5,
            unit: "dashes",
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "Simple Syrup" },
                create: { name: "Simple Syrup", type: "syrup" },
              },
            },
            amount: 10,
            unit: "ml",
          },
        ],
      },
      image: "/images/drinks/old-fashioned.png",
      slug: "/drinks/old-fashioned",
    },
  });

  console.log("Added drink:", whiskyOldFashioned);

  // Add Mohito drink
  const mohito = await prisma.drink.create({
    data: {
      name: "Mohito",
      recipe: `1. Muddle the **mint leaves**, **lime wedges**, and **sugar** in a glass to release the flavors.  
2. Fill the glass with **ice cubes**.  
3. Pour in the **white rum**.  
4. Top up with **soda water** and stir well.  
5. Garnish with a **mint sprig** and enjoy! 🍹`,
      createdAt: new Date("2025-04-07T15:54:00Z"), // Current date
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "rum" },
                create: { name: "rum", type: "spirit" },
              },
            },
            amount: 60,
            unit: "ml",
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "lime" },
                create: { name: "lime", type: "fruit" },
              },
            },
            amount: 1,
            unit: "pieces",
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "sugar" },
                create: { name: "sugar", type: "sweetener" },
              },
            },
            amount: 2,
            unit: "tsp",
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "mint" },
                create: { name: "mint", type: "herb" },
              },
            },
            amount: 10,
            unit: "leaves",
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "sparkling water" },
                create: { name: "sparkling water", type: "mixer" },
              },
            },
            amount: 200,
            unit: "ml",
          },
        ],
      },
      image: "/images/drinks/mohito.png",
      slug: "/drinks/mohito",
    },
  });

  console.log("Added drink:", mohito);

  // Add Mint Julep drink
  const mintJulep = await prisma.drink.create({
    data: {
      name: "Mint Julep",
      recipe: `1. Muddle **mint leaves** and **sugar** (or **simple syrup**) in a glass or julep cup.  
2. Fill the glass with **crushed ice**.  
3. Pour in the **bourbon** and stir until well chilled.  
4. Top with more **crushed ice** and garnish with a **mint sprig**.  
5. Enjoy! 🥃🌿`,
      createdAt: new Date("2025-04-07T15:54:00Z"), // Current date
      ingredients: {
        create: [
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "mint" },
                create: { name: "mint", type: "herb" },
              },
            },
            amount: 10,
            unit: "leaves",
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "sugar" },
                create: { name: "sugar", type: "sweetener" },
              },
            },
            amount: 1,
            unit: "tsp",
          },
          {
            ingredient: {
              connectOrCreate: {
                where: { name: "whisky" },
                create: { name: "whisky", type: "spirit" },
              },
            },
            amount: 45,
            unit: "ml",
          },
        ],
      },
      image: "/images/drinks/mint-julep.png",
      slug: "/drinks/mint-julep",
    },
  });

  console.log("Added drink:", mintJulep);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
