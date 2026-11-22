# Mocktails & Virgin Orders

Status: **not yet implemented**. Delete this file once the feature ships and
the rules worth keeping have moved into CLAUDE.md or the code.

Clickable prototype (private canvas):
https://claude.ai/artifact/F878LRDyBbLVxzDCbcquHn

## Definitions

- **Alcoholic ingredient** — `Ingredient.isAlcoholic = true`. This is
  independent of `IngredientType`: angostura is a `bitter` and alcoholic;
  triple sec is currently typed `syrup` and alcoholic.
- **Mocktail** — a drink with no alcoholic ingredient. Derived from the
  ingredients, never stored. Strict: any alcoholic ingredient, even a few
  dashes of bitters, means it is not a mocktail.
- **Virgin order** — an order of a cocktail with its alcoholic ingredients
  left out. Only possible when `Drink.virginAllowed = true`.

## Data model

```prisma
model Ingredient { isAlcoholic Boolean @default(false) }
model Drink      { virginAllowed Boolean @default(false)  virginNote String? }
model Order      { isVirgin Boolean @default(false) }
```

- `virginNote` — the bartender's instruction for the virgin version
  (e.g. "Top up with 40 ml orange juice"). Shown on the dashboard and on the
  guest's PDP when the virgin toggle is on.
- `virginAllowed` lives on the drink (does the recipe work without alcohol),
  not on the event.
- Mark existing ingredients as alcoholic from a hand-reviewed list, never a
  heuristic: a wrong `false` serves alcohol to someone who asked for none.
- Every drink-creation path must allow mocktails and set the new fields:
  - `CreateDrinkSchema` in `lib/validation/drink.ts` (currently requires a
    spirit),
  - the LLM prompt in `LLM/src/prompts/generateDrink.ts` (same rule),
  - seed scripts and the `new-event` skill.

## Visual language

- New token **Ice Aqua `#5ED3F3`**. It only *labels what is in the glass*:
  the MOCKTAIL badge/tag, the VIRGIN tag, "skip" flags and the bartender's
  virgin banner.
- **Gold stays the action colour.** Every order button is gold "Order Now" —
  for cocktails, mocktails and virgin orders alike.
- **No aqua rings or borders.** Borders already mean order status (guest
  order cards) or selection (bartender cards).
- Never rely on colour alone: every marker carries text.
- Wording: the label on an omitted ingredient is **"skip"**, everywhere.
  Sentences use natural wording ("Without tequila & triple sec",
  "tequila and triple sec are left out").

## PLP — "All Drinks" tab

- Type switch **All / Cocktails / Mocktails**, kept in the URL as
  `?type=all|cocktail|mocktail` like the other filters (absent = all).
- "Mocktails" means true mocktails only; cocktails that allow a virgin
  version are not included.
- Selecting Mocktails hides "Filter by Main Spirit" and clears spirit
  filters (they could only ever return zero results).
- The result count includes the type filter.
- Mocktail cards get a solid aqua "Mocktail" badge in the photo's top-left
  corner. Cocktail cards are unchanged.
- Still no Quick Order UI on this tab.

## PDP and event page

- Mocktails: a subtle "Mocktail · alcohol-free" tag under the drink name.
  Quick Order is unchanged.
- Event page heading "Cocktails in this event" becomes "Tonight's menu".
- Virgin toggle — "Make it virgin", hint "Without <alcoholic ingredients> ·
  0% alcohol" — appears in the Quick Order UI only when `virginAllowed` is
  true and the drink is not a mocktail. Otherwise it is hidden, not disabled.
- Toggle on: alcoholic ingredient lines are struck through with a "skip"
  flag, and a note shows `virginNote`.
- The toggle applies to the whole order quantity. A mixed group (3 regular,
  1 virgin) places separate orders.
- After ordering, quantity resets to 1 but the toggle keeps its state: an
  accidental alcoholic drink is worse than an accidental virgin one.
- Success toast: "Virgin order placed!" vs "Order placed!", same success
  style.
- All existing Quick Order visibility rules in CLAUDE.md still apply.

## Server

- `orderDrink` rejects `isVirgin: true` when the drink has
  `virginAllowed = false` or is a mocktail. Never trust the client.

## /orders

- The card border keeps meaning status.
- Virgin order: solid VIRGIN tag plus a "Without …" line.
- Mocktail: subtle "Mocktail" tag.
- Past-order receipts carry the same tags.

## Bartender dashboard

- Order card: VIRGIN tag next to the quantity badge and a
  "Leave out: <ingredients>" line. Mocktail: subtle tag. The selected card
  keeps its gold border. History cards keep the tags.
- Recipe panel for a virgin order:
  - a solid aqua banner at the top: "Virgin order — Leave out X & Y." plus
    `virginNote`,
  - alcoholic lines struck through with a "skip" flag,
  - the instructions markdown is left as is: names in the prose do not
    reliably match ingredient names (a recipe says "bourbon" where the
    ingredient is "whisky").
- `toSortedRecipeLines` sorts alcoholic ingredients first (generalising
  "spirits first"), so struck-through lines sit together everywhere.

## Implementation order (one PR each)

1. **Data** — schema, hand-reviewed `isAlcoholic` list, seed scripts,
   validation and LLM prompt.
2. **PLP** — type switch, badges, spirit filter hiding.
3. **Ordering** — toggle on PDP and event page, server validation,
   `/orders` tags.
4. **Dashboard** — card tags, "Leave out" line, recipe-panel banner and skip
   lines, alcoholic-first sort.
5. **Tooling** — the `new-event` skill sets the new fields.

## Open question

- When a cocktail's mocktail twin is on the same menu (Apricot Mule and
  Apricot Virgin Mule), should the cocktail still allow virgin orders, or
  should its PDP link to the twin instead?
