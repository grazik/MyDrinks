// Read-only. Usage (from the project root):
//   npx tsx .claude/skills/new-event/scripts/preflight.ts --slug halloween-2026 "Drink One" "Drink Two"
import { PrismaClient } from "@prisma/client";

const REQUIRED_TRIGGERS: Record<string, string> = {
  event_status_notify: "prisma/sql/bar_status_trigger.sql",
  event_complete_resolve_orders: "prisma/sql/resolve_orders_on_event_complete.sql",
};

const parseArgs = (argv: string[]) => {
  const slugIndex = argv.indexOf("--slug");
  const slug = slugIndex >= 0 ? argv[slugIndex + 1] : undefined;
  const drinkNames = argv.filter(
    (arg, i) => arg !== "--slug" && i !== slugIndex + 1,
  );
  return { slug, drinkNames };
};

const describeDatabase = (url: string | undefined) => {
  if (!url) return "DATABASE_URL is not set";
  try {
    const { hostname, port, pathname } = new URL(url);
    return `${hostname}:${port}${pathname}`;
  } catch {
    return "DATABASE_URL is not a valid URL";
  }
};

async function main() {
  const { slug, drinkNames } = parseArgs(process.argv.slice(2));
  const prisma = new PrismaClient();

  try {
    console.log(`Database: ${describeDatabase(process.env.DATABASE_URL)}\n`);

    const triggers = await prisma.$queryRaw<{ tgname: string }[]>`
      SELECT tgname FROM pg_trigger
      WHERE tgrelid = '"Event"'::regclass AND NOT tgisinternal`;
    const installed = new Set(triggers.map(({ tgname }) => tgname));
    console.log("Event triggers:");
    for (const [name, file] of Object.entries(REQUIRED_TRIGGERS)) {
      console.log(`  ${installed.has(name) ? "✅" : "❌"} ${name}  (${file})`);
    }

    const events = await prisma.event.findMany({
      where: { status: { in: ["ACTIVE", "UPCOMING"] } },
      select: { title: true, slug: true, status: true, eventDate: true },
      orderBy: { eventDate: "asc" },
    });
    console.log("\nActive / upcoming events:");
    if (events.length === 0) console.log("  (none)");
    for (const event of events) {
      console.log(
        `  ${event.status.padEnd(8)} ${event.slug}  "${event.title}"  ${event.eventDate.toISOString()}`,
      );
    }

    if (slug) {
      const existing = await prisma.event.findUnique({ where: { slug } });
      console.log(
        `\nSlug "${slug}": ${existing ? `⚠️  TAKEN by "${existing.title}" (${existing.status})` : "✅ free"}`,
      );
    }

    if (drinkNames.length > 0) {
      const existingDrinks = await prisma.drink.findMany({
        where: { name: { in: drinkNames } },
        select: { name: true },
      });
      const existingNames = new Set(existingDrinks.map(({ name }) => name));
      console.log("\nDrinks:");
      for (const name of drinkNames) {
        console.log(
          `  ${existingNames.has(name) ? "⚠️  EXISTS (will be linked, not updated)" : "✅ new"}  ${name}`,
        );
      }
    }

    const ingredients = await prisma.ingredient.findMany({
      select: { name: true, type: true },
      orderBy: [{ type: "asc" }, { name: "asc" }],
    });
    console.log(`\nExisting ingredients (${ingredients.length}), by type:`);
    const byType = new Map<string, string[]>();
    for (const { name, type } of ingredients) {
      byType.set(type, [...(byType.get(type) ?? []), name]);
    }
    for (const [type, names] of byType) {
      console.log(`  ${type}: ${names.join(", ")}`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
