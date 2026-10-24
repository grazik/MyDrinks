---
name: new-event
description: Create a new themed MyDrinks event — a standalone Prisma seed script (prisma/seed_<name>.ts) that creates the event's drinks, ingredients and Event row, optionally activates it, plus the list of images to drop into public/images. Use when the user wants to add, create, plan, or seed a new event / party / themed night (e.g. "create a Halloween event", "new event with these 6 drinks", "seed the christmas event"), or is on an `event/*` branch and asks to set up the event.
---

# New event

An event in MyDrinks is a standalone seed script, not app code. The reference is the most recent `prisma/seed_<event>.ts` (at the time of writing `prisma/seed_apricot_lovers.ts`). **Read it in full before writing anything.** The new script copies its structure and changes only the data. If a newer event seed exists, or the reference has diverged from what this skill describes, follow the file.

## 1. Gather the inputs

Ask in one message for anything the user hasn't already given. Don't ask about things you can derive.

| Input | Notes |
|---|---|
| Title | e.g. "Halloween Night". Shown in the UI. |
| Slug | `<theme>-<year>`, kebab-case, e.g. `halloween-2026`. Derive it from the title and date, and confirm it. Image filename = slug. |
| Date & start time | Local time in Poland. See the timezone rule below. |
| Drinks | Names, plus a recipe for each, or permission to write them. Usually 6–8, with some alcohol-free ones. |
| Activate on seed? | The reference script activates the event immediately and **completes the currently ACTIVE event**. Ask whether that's wanted, or whether the event should stay `UPCOMING`. |

**Timezone rule:** write `EVENT_DATE` with an explicit offset for *that date*, never copied from the reference. Poland is `+02:00` in summer time and `+01:00` otherwise (the clocks go back on the last Sunday of October). For example, Halloween 2026 (Oct 31) is `+01:00`, but Apricot Lovers (Oct 10) was `+02:00`. Check with:
`TZ=Europe/Warsaw node -e 'console.log(new Date("2026-10-31T19:00").toString())'`

## 2. Preflight (read-only)

Run the following. Don't read `.env` / `.env.production` yourself: they hold credentials, and the script prints only the host and database name.

```bash
npx tsx .claude/skills/new-event/scripts/preflight.ts --slug <slug> "<Drink 1>" "<Drink 2>" ...
```

It prints the target database host, whether the two Event triggers are installed, the current ACTIVE/UPCOMING events, whether the slug and drink names are free, and every existing ingredient with its type. Act on it:

- **Slug taken:** the script skips creation and only re-activates the old event. Choose a new slug.
- **Drink name exists:** `Drink.name` is unique, so the existing drink gets *linked* as it is. Its recipe and ingredients are not updated. Tell the user, and rename the drink if they meant it to be new.
- **Triggers missing:** activating will complete the old event without resolving its open orders and without broadcasting bar open/close. Apply them first (both files are idempotent):
  `npx prisma db execute --file prisma/sql/<file>.sql --schema prisma/schema.prisma`
- **Ingredients:** reuse existing names exactly. `Ingredient.name` is unique and the seed upserts with `update: {}`, so a new spelling creates a duplicate ingredient. A different `type` on an existing name is silently ignored.

If preflight can't connect, say so and carry on writing the file. Do not edit `.env`.

## 3. Write `prisma/seed_<snake_name>.ts`

Copy the reference file and change only:

- the `drinks` array, `EVENT_SLUG`, `EVENT_DATE`, the event `title` and `description`;
- the `process.argv[1]?.endsWith("seed_<...>.ts")` guard, which **must** match the new filename, or running the file does nothing;
- if the user chose not to activate: don't call `activateEvent` and keep `status: "UPCOMING"`.

Leave `sanitizeFilename`, its MUST-match comment, the transaction `timeout` and the existing-event skip logic unchanged. Do not add the script to `prisma/seed.ts`; event seeds are run one at a time.

Data conventions (taken from the existing seeds; keep them consistent):

- `type` must be an `IngredientType`: `spirit | syrup | mixer | fruit | bitter | sweetener | herb`. Liqueurs such as triple sec are `syrup`. Salts and spices are `bitter`.
- Citrus juice is the fruit by name with `ml` (`lime`, 25 ml). A garnish of the same fruit is a second line (`lime`, 1 `slice`).
- Units: `ml`, `tsp`, `pinch`, `dashes`, `slice`, `sprig`, `leaves`, `pieces`. Use a numeric `amount` (1 for garnishes).
- `recipe` is a markdown numbered list in a template literal. Each ingredient is **bolded** where it's first used. The last step ends with "and enjoy!" plus one emoji for the theme (🍑 for apricot, 🎃 for Halloween).
- `description` is one evocative paragraph of about 2 sentences. Name two signature drinks and mention the alcohol-free options if there are any.

Then type-check the file: `npx tsc --noEmit` (or `npx eslint prisma/seed_<name>.ts`).

## 4. Images

The seed only writes paths; the files must exist or the cards show broken images. List exactly what's needed:

- one per drink: `public/images/drinks/<sanitizeFilename(drink.name)>.png`, portrait 2:3 (the existing ones are 683×1024);
- the event image: `public/images/events/<slug>.png`, landscape (the existing one is 1376×768).

Compute each filename with the same rules as `sanitizeFilename` (lowercase; anything that isn't a-z or 0-9 becomes `-`; collapse repeated dashes; trim dashes from both ends). For example, "Witch's Brew" becomes `witch-s-brew.png`. If the user wants prompts, or wants help picking between generated images, use the `image-prompts` skill. Check which files are already there with `ls`, and report what's missing.

## 5. Run (only when the user says so)

Running the seed writes to the database, and with activation it **closes the current event and cancels its open orders**. Before running, confirm the target database that preflight printed.

- Local (`.env`): `npx tsx prisma/seed_<name>.ts`
- Production (`.env.production`): run only if the user explicitly asks for production in this conversation:
  `DATABASE_URL="$(grep '^DATABASE_URL=' .env.production | cut -d= -f2- | tr -d '"')" npx tsx prisma/seed_<name>.ts`

Afterwards, run preflight again with the same arguments. The slug should now be shown as taken, and the event should appear as ACTIVE (or UPCOMING). Report the result.

## 6. Hand off

Give a short summary: the file path, the drinks (marking which were new and which already existed), any missing images, and whether the seed was run and against which database. Don't commit; the user commits manually.
