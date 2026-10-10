import { IngredientType, Prisma, PrismaClient } from "@prisma/client";

type IngredientInput = {
  name: string;
  type: IngredientType;
  amount: number;
  unit: string;
};

type DrinkInput = {
  name: string;
  recipe: string;
  ingredients: IngredientInput[];
};

const EVENT_SLUG = "apricot-lovers-2026";

const EVENT_DATE = new Date("2026-10-10T16:00:00+02:00");

const drinks: DrinkInput[] = [
  {
    name: "Apricot Whiskey Sour",
    recipe: `1. In a cocktail shaker, combine the **whisky**, **apricot puree**, **lemon juice**, **simple syrup**, and **egg white** (optional).
2. Dry shake (without ice) to emulsify the egg white.
3. Add **ice** to the shaker and shake again until the outside of the shaker is frosty.
4. Strain into a rocks glass filled with **ice cubes**.
5. Garnish the foam with freshly grated **nutmeg** and enjoy! 🍑`,
    ingredients: [
      { name: "whisky", type: "spirit", amount: 50, unit: "ml" },
      { name: "apricot puree", type: "fruit", amount: 30, unit: "ml" },
      { name: "lemon", type: "fruit", amount: 20, unit: "ml" },
      { name: "simple syrup", type: "syrup", amount: 10, unit: "ml" },
      { name: "egg white", type: "mixer", amount: 30, unit: "ml" },
      { name: "nutmeg", type: "bitter", amount: 1, unit: "pinch" },
    ],
  },
  {
    name: "Apricot Margarita",
    recipe: `1. Rim the edge of a rocks glass with **chili salt**.
2. In a cocktail shaker, combine the **tequila**, **apricot puree**, **lime juice**, **triple sec**, and **agave syrup** (optional, to taste).
3. Fill the shaker with **ice cubes** and shake well.
4. Strain into the prepared glass filled with **ice cubes**.
5. Serve and enjoy! 🍑`,
    ingredients: [
      { name: "tequila", type: "spirit", amount: 50, unit: "ml" },
      { name: "apricot puree", type: "fruit", amount: 30, unit: "ml" },
      { name: "lime", type: "fruit", amount: 25, unit: "ml" },
      { name: "triple sec", type: "syrup", amount: 15, unit: "ml" },
      { name: "agave syrup", type: "syrup", amount: 5, unit: "ml" },
      { name: "chili salt", type: "bitter", amount: 1, unit: "pinch" },
    ],
  },
  {
    name: "Apricot Mule",
    recipe: `1. Fill a copper mug with **ice cubes**.
2. Pour in the **vodka**, **apricot puree**, and **lime juice**.
3. Top up with **ginger beer** and stir gently.
4. Garnish with a **lime slice** and enjoy! 🍑`,
    ingredients: [
      { name: "vodka", type: "spirit", amount: 50, unit: "ml" },
      { name: "apricot puree", type: "fruit", amount: 30, unit: "ml" },
      { name: "lime", type: "fruit", amount: 15, unit: "ml" },
      { name: "ginger beer", type: "mixer", amount: 100, unit: "ml" },
      { name: "lime", type: "fruit", amount: 1, unit: "slice" },
    ],
  },
  {
    name: "Apricot Daiquiri",
    recipe: `1. In a cocktail shaker, combine the **white rum**, **apricot puree**, **lime juice**, and **simple syrup** (5–10 ml, to taste).
2. Fill the shaker with **ice cubes**.
3. Shake hard for about 15 seconds until the outside of the shaker is frosty.
4. Double strain into a chilled coupe glass.
5. Serve immediately and enjoy! 🍑`,
    ingredients: [
      { name: "rum", type: "spirit", amount: 50, unit: "ml" },
      { name: "apricot puree", type: "fruit", amount: 30, unit: "ml" },
      { name: "lime", type: "fruit", amount: 20, unit: "ml" },
      { name: "simple syrup", type: "syrup", amount: 10, unit: "ml" },
    ],
  },
  {
    name: "Apricot Thyme Lemonade",
    recipe: `1. In a cocktail shaker, combine the **apricot puree**, **lemon juice**, and **thyme syrup**.
2. Fill the shaker with **ice cubes** and shake well.
3. Strain into a highball glass filled with **ice cubes**.
4. Top up with **sparkling water** and stir gently.
5. Garnish with a **thyme sprig** and enjoy! 🍑`,
    ingredients: [
      { name: "apricot puree", type: "fruit", amount: 40, unit: "ml" },
      { name: "lemon", type: "fruit", amount: 25, unit: "ml" },
      { name: "thyme syrup", type: "syrup", amount: 15, unit: "ml" },
      { name: "sparkling water", type: "mixer", amount: 100, unit: "ml" },
      { name: "thyme", type: "herb", amount: 1, unit: "sprig" },
    ],
  },
  {
    name: "Apricot Virgin Mule",
    recipe: `1. Fill a copper mug or highball glass with **ice cubes**.
2. Pour in the **apricot puree** and **lime juice**.
3. Top up with **ginger beer** and stir gently.
4. Garnish with a **lime slice** and a **mint leaf** and enjoy! 🍑`,
    ingredients: [
      { name: "apricot puree", type: "fruit", amount: 40, unit: "ml" },
      { name: "lime", type: "fruit", amount: 15, unit: "ml" },
      { name: "ginger beer", type: "mixer", amount: 100, unit: "ml" },
      { name: "lime", type: "fruit", amount: 1, unit: "slice" },
      { name: "mint", type: "herb", amount: 1, unit: "leaves" },
    ],
  },
  {
    name: "Apricot Rosemary Tonic Spritz",
    recipe: `1. Fill a wine glass with **ice cubes**.
2. Pour in the **apricot puree** and **lemon juice**.
3. Top up with **tonic water** and stir gently.
4. Lightly torch a **rosemary sprig** with a lighter (or rub it between your palms) to release its aroma.
5. Place the rosemary in the glass and enjoy! 🍑`,
    ingredients: [
      { name: "apricot puree", type: "fruit", amount: 40, unit: "ml" },
      { name: "lemon", type: "fruit", amount: 10, unit: "ml" },
      { name: "tonic water", type: "mixer", amount: 120, unit: "ml" },
      { name: "rosemary", type: "herb", amount: 1, unit: "sprig" },
    ],
  },
];

// MUST match sanitizeFilename in LLM/src/steps/saveRecipe.ts so slugs and image paths line up with pipeline-generated drinks.
const sanitizeFilename = (filename: string): string =>
  filename
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const createEvent = async (tx: Prisma.TransactionClient) => {
  const ingredientIds = new Map<string, string>();
  const drinkIds: string[] = [];
  for (const drink of drinks) {
    const existingDrink = await tx.drink.findUnique({
      where: { name: drink.name },
    });

    if (existingDrink) {
      console.log(`⏭️  ${drink.name}: Already exists, linking existing drink`);
      drinkIds.push(existingDrink.id);
      continue;
    }

    for (const { name, type } of drink.ingredients) {
      if (ingredientIds.has(name)) continue;

      const ingredient = await tx.ingredient.upsert({
        where: { name },
        update: {},
        create: { name, type },
      });
      ingredientIds.set(name, ingredient.id);
    }

    const sanitizedName = sanitizeFilename(drink.name);

    const created = await tx.drink.create({
      data: {
        name: drink.name,
        recipe: drink.recipe,
        source_url: "Manually curated",
        image: `/images/drinks/${sanitizedName}.png`,
        slug: `/drinks/${sanitizedName}`,
        ingredients: {
          create: drink.ingredients.map((ing) => ({
            amount: ing.amount,
            unit: ing.unit,
            ingredient: { connect: { id: ingredientIds.get(ing.name)! } },
          })),
        },
      },
    });

    console.log("Added drink:", created.name);
    drinkIds.push(created.id);
  }

  return tx.event.create({
    data: {
      slug: EVENT_SLUG,
      title: "Apricot Lovers",
      description:
        "A sun-kissed evening dedicated to the velvety, sweet-tart apricot. From a silky Apricot Whiskey Sour to a chili-rimmed Apricot Margarita, every drink celebrates the fruit at its ripest — with three refreshing alcohol-free creations, so everyone can raise a glass.",
      eventDate: EVENT_DATE,
      image: `/images/events/${EVENT_SLUG}.png`,
      status: "UPCOMING",
      eventDrink: {
        create: drinkIds.map((drinkId) => ({ drinkId })),
      },
    },
  });
};

// Completing the previous event relies on prisma/sql/resolve_orders_on_event_complete.sql
// to close out its unfinished orders — apply that trigger before running this.
const activateEvent = async (tx: Prisma.TransactionClient, eventId: string) => {
  const previousEvents = await tx.event.findMany({
    where: { status: "ACTIVE", id: { not: eventId } },
  });

  for (const previous of previousEvents) {
    await tx.event.update({
      where: { id: previous.id },
      data: { status: "COMPLETED" },
    });
    console.log("Completed event:", previous.title);
  }

  await tx.event.update({
    where: { id: eventId },
    data: { status: "ACTIVE" },
  });
};

async function main(prisma: PrismaClient) {
  const event = await prisma.$transaction(
    async (tx) => {
      const existingEvent = await tx.event.findUnique({
        where: { slug: EVENT_SLUG },
      });

      if (existingEvent) {
        console.log(
          `⏭️  Event "${EVENT_SLUG}" already exists, skipping creation`,
        );
      }

      const event = existingEvent ?? (await createEvent(tx));
      await activateEvent(tx, event.id);

      return event;
    },
    // The default 5s interactive-transaction timeout is too tight for ~20 sequential writes against a remote DB.
    { timeout: 30_000 },
  );

  console.log("Active event:", event.title);
}

export { main };

if (process.argv[1]?.endsWith("seed_apricot_lovers.ts")) {
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
