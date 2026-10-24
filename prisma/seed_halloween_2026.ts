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

const EVENT_SLUG = "halloween-2026";

const EVENT_DATE = new Date("2026-10-31T17:00:00+01:00");

const drinks: DrinkInput[] = [
  {
    name: "Blood Moon",
    recipe: `1. In a cocktail shaker, combine the **whisky**, **lemon juice**, and **simple syrup**. If using **egg white** (optional), add it and dry shake without ice first.
2. Add **ice** and shake again until the outside of the shaker is frosty.
3. Strain into a rocks glass over fresh **ice cubes**.
4. Slowly pour the **dry red wine** over the back of a bar spoon so it floats on top like a blood-red moon, and enjoy! 🎃`,
    ingredients: [
      { name: "whisky", type: "spirit", amount: 60, unit: "ml" },
      { name: "lemon", type: "fruit", amount: 25, unit: "ml" },
      { name: "simple syrup", type: "syrup", amount: 20, unit: "ml" },
      { name: "red wine", type: "spirit", amount: 20, unit: "ml" },
      { name: "egg white", type: "mixer", amount: 30, unit: "ml" },
    ],
  },
  {
    name: "Black Widow",
    recipe: `1. In a cocktail shaker, combine the **vodka**, **blackcurrant liqueur**, and **lime juice**.
2. Fill the shaker with **ice cubes** and shake hard.
3. Strain into a chilled coupe glass and enjoy! 🎃

_Tip: if it's too sweet, use 25 ml liqueur and 25 ml lime juice._`,
    ingredients: [
      { name: "vodka", type: "spirit", amount: 40, unit: "ml" },
      { name: "blackcurrant liqueur", type: "spirit", amount: 30, unit: "ml" },
      { name: "lime", type: "fruit", amount: 20, unit: "ml" },
    ],
  },
  {
    name: "Vampire's Kiss",
    recipe: `1. Fill a rocks glass with **crushed ice**.
2. Add the **gin**, **lemon juice**, and **simple syrup** (10–15 ml, to taste), then stir.
3. Top with more crushed ice to form a mound and slowly drizzle the **cherry liqueur** over it so it bleeds down through the ice.
4. Garnish with a **lemon wheel** and a **cocktail cherry** and enjoy! 🎃

_Tip: use 10 ml syrup if the cherry liqueur is sweet. If it's pale or dry, add a little grenadine or blackcurrant liqueur to the drizzle for colour._`,
    ingredients: [
      { name: "gin", type: "spirit", amount: 50, unit: "ml" },
      { name: "lemon", type: "fruit", amount: 25, unit: "ml" },
      { name: "simple syrup", type: "syrup", amount: 10, unit: "ml" },
      { name: "cherry liqueur", type: "spirit", amount: 20, unit: "ml" },
      { name: "lemon", type: "fruit", amount: 1, unit: "slice" },
      { name: "cherry", type: "fruit", amount: 1, unit: "pieces" },
    ],
  },
  {
    name: "Toxic Waste",
    recipe: `1. Fill a highball glass with **ice cubes**.
2. Pour in the **vodka**, **melon liqueur**, **lime juice**, and **lemon juice**.
3. Top with **lemon-lime soda** (e.g. Sprite) and stir briefly.
4. Drop a **cocktail cherry** into the glass (or hang a gummy worm on the rim) and enjoy! 🎃

_Tip: replace half the soda with tonic water and the drink will glow under UV light._`,
    ingredients: [
      { name: "vodka", type: "spirit", amount: 40, unit: "ml" },
      { name: "melon liqueur", type: "spirit", amount: 30, unit: "ml" },
      { name: "lime", type: "fruit", amount: 20, unit: "ml" },
      { name: "lemon", type: "fruit", amount: 10, unit: "ml" },
      { name: "lemon-lime soda", type: "mixer", amount: 70, unit: "ml" },
      { name: "cherry", type: "fruit", amount: 1, unit: "pieces" },
    ],
  },
  {
    name: "Witching Hour",
    recipe: `1. Fill a highball glass with **ice cubes**.
2. Add the **gin**, **tonic water**, and a pinch of **edible glitter** (optional), and stir briefly.
3. Slowly pour the **butterfly pea flower concentrate** over the back of a bar spoon so it forms a blue layer on top.
4. Serve with a **lemon wheel** on the rim. Stirring turns the drink purple, and squeezing in the lemon turns it pink. Enjoy! 🎃

_Tip: if the concentrate is a sweetened syrup it will sink, so add it first. The tonic makes the drink glow under UV light._`,
    ingredients: [
      { name: "gin", type: "spirit", amount: 50, unit: "ml" },
      {
        name: "butterfly pea flower concentrate",
        type: "mixer",
        amount: 15,
        unit: "ml",
      },
      { name: "tonic water", type: "mixer", amount: 150, unit: "ml" },
      { name: "lemon", type: "fruit", amount: 1, unit: "slice" },
    ],
  },
  {
    name: "Poisoned Apple",
    recipe: `1. Fill a highball glass with **ice cubes**.
2. Pour in the **whisky**, **cloudy apple juice**, and **lemon juice**.
3. Top with **ginger ale** and stir briefly.
4. Slowly pour the **grenadine** down the side of the glass so it sinks to the bottom.
5. Garnish with thin **apple slices** (or a cinnamon stick) and enjoy! 🎃

_Tip: leave out the whisky for a non-alcoholic version._`,
    ingredients: [
      { name: "whisky", type: "spirit", amount: 45, unit: "ml" },
      { name: "apple juice", type: "mixer", amount: 60, unit: "ml" },
      { name: "lemon", type: "fruit", amount: 15, unit: "ml" },
      { name: "ginger ale", type: "mixer", amount: 80, unit: "ml" },
      { name: "grenadine", type: "syrup", amount: 10, unit: "ml" },
      { name: "apple", type: "fruit", amount: 1, unit: "slice" },
    ],
  },
  {
    name: "Shapeshifter",
    recipe: `1. Fill a highball glass with **ice cubes**.
2. Add the **butterfly pea flower concentrate**, **simple syrup**, and **sparkling water**, and stir briefly. The drink turns deep blue.
3. Serve with the **lemon juice** in a shot glass as the "antidote". Pour it in and watch the drink turn pink, and enjoy! 🎃

_Tip: use plain sparkling water, not Sprite or tonic. Their acidity would turn the drink purple before the reveal._`,
    ingredients: [
      {
        name: "butterfly pea flower concentrate",
        type: "mixer",
        amount: 20,
        unit: "ml",
      },
      { name: "simple syrup", type: "syrup", amount: 20, unit: "ml" },
      { name: "sparkling water", type: "mixer", amount: 150, unit: "ml" },
      { name: "lemon", type: "fruit", amount: 30, unit: "ml" },
    ],
  },
  {
    name: "Evil Eye",
    recipe: `1. Fill a highball glass with **ice cubes**.
2. Pour in the **cherry nectar** (or cranberry juice) and **lime juice**.
3. Top with **ginger ale** and stir briefly.
4. Push a **cocktail cherry** into a canned **lychee**, put the eyeball on a cocktail pick, rest it on the rim, and enjoy! 🎃`,
    ingredients: [
      { name: "cherry nectar", type: "mixer", amount: 120, unit: "ml" },
      { name: "lime", type: "fruit", amount: 15, unit: "ml" },
      { name: "ginger ale", type: "mixer", amount: 60, unit: "ml" },
      { name: "lychee", type: "fruit", amount: 1, unit: "pieces" },
      { name: "cherry", type: "fruit", amount: 1, unit: "pieces" },
    ],
  },
  {
    name: "Ghost",
    recipe: `1. In a cocktail shaker, combine the cold **milk**, **lychee syrup** (from the can), and a very small pinch of **ground ginger**.
2. Fill the shaker with **ice cubes** and shake very hard for about 15 seconds.
3. Strain into a glass without ice.
4. Garnish with a **lychee** on a cocktail pick and serve immediately, while the foam holds. Enjoy! 🎃

_Tip: don't add citrus or anything carbonated, or the milk will curdle._`,
    ingredients: [
      { name: "milk", type: "mixer", amount: 120, unit: "ml" },
      { name: "lychee syrup", type: "syrup", amount: 30, unit: "ml" },
      { name: "ground ginger", type: "bitter", amount: 1, unit: "pinch" },
      { name: "lychee", type: "fruit", amount: 1, unit: "pieces" },
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
      title: "Halloween 2026",
      description:
        "The bar turns haunted for one night only — a wine-floated Blood Moon rises over the counter while the Witching Hour shifts from blue to purple to pink in your hand. Three alcohol-free potions, from the colour-changing Shapeshifter to the eerie milky Ghost, mean nobody leaves without a treat.",
      eventDate: EVENT_DATE,
      image: `/images/events/${EVENT_SLUG}.png`,
      status: "UPCOMING",
      eventDrink: {
        create: drinkIds.map((drinkId) => ({ drinkId })),
      },
    },
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

      return existingEvent ?? (await createEvent(tx));
    },
    // The default 5s interactive-transaction timeout is too tight for ~20 sequential writes against a remote DB.
    { timeout: 30_000 },
  );

  console.log(`Event: ${event.title} (${event.status})`);
}

export { main };

if (process.argv[1]?.endsWith("seed_halloween_2026.ts")) {
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
