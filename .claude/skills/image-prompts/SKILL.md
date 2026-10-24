---
name: image-prompts
description: Write image-generation prompts for MyDrinks drink photos and event banners, in the same style as the LLM pipeline (LLM/src/pipeline.ts → generateImagePrompt), and optionally pick the best of several generated candidates and save it under the right filename. Use when the user wants image prompts, photos, pictures or artwork for drinks or an event ("prompts for the halloween drinks", "I need images for these cocktails", "pick the best of these 4 images"), or when /new-event reaches its images step.
---

# Image prompts

This skill does the same job as image step 2 of `LLM/src/pipeline.ts`, with you in place of the local model:

| Pipeline | This skill |
|---|---|
| `generateImagePrompt(recipe)`: Ollama writes one prompt from the name, ingredients and recipe | §2: you write the prompt by the same rules |
| Imagen 3 generates 4 candidates | The user generates the images with their own tool |
| `selectBestImage`: the vision model picks 1 of 4 | §4: optional; you look at the candidates and pick one |
| `saveImage` saves to `public/images/drinks/<sanitized>.png` | §4: copy the chosen image to the same path |

**Read `LLM/src/prompts/generateImagePromp.ts` first.** It is the source of truth for the rules. If it has changed since this skill was written, follow the file.

## 1. Collect the drinks

Each prompt needs the drink's **name, ingredients with amounts, and recipe**, the same input `generateImagePrompt` gets. Take them from the first of these that has them:

1. an event seed the user names, or the one on the current `event/*` branch (`prisma/seed_<event>.ts`, the `drinks` array);
2. the database, for drinks that already exist (use a read-only `npx tsx -e` with Prisma; never read `.env`);
3. the user.

Don't write a prompt from the name alone. The liquid colour and garnish come from the ingredients and recipe.

## 2. Drink prompts

Write **one** prompt per drink. These are the rules from `generateImagePromp.ts`:

- classic cocktail photography; professional but timeless; authentic and traditional;
- **the right glassware for this specific cocktail** (a copper mug for mules, a coupe for daiquiris, a rocks glass for sours, a highball for long drinks, a wine glass for spritzes);
- the key visual elements: **liquid colour** (worked out from the ingredients, e.g. apricot puree plus whisky gives a hazy golden orange), **garnish** (from the recipe's garnish step), and **ice** if the recipe uses it;
- a warm, traditional bar atmosphere;
- **60 words maximum**;
- starting shape: `"Traditional [cocktail name] in [appropriate glass] with [garnish], warm amber lighting, classic wooden bar setting"`.

The existing photos have a consistent look. Keep new ones matching it, within the 60 words: a single drink centred on a dark polished wooden bar top, often on a linen napkin, with condensation on the glass. The background is out of focus: back-bar bottles, a brass lamp, warm amber bokeh. The camera is slightly above eye level with a shallow depth of field. Portrait **2:3** (683×1024). If the user's image tool doesn't offer 2:3, tell them to pick **3:4**: `DrinkCard` crops to 3:4 and the PDP `ImagesSection` to 2:3, so 3:4 loses only a little at the sides. 9:16 is too tall and loses the top and bottom.

Drink photos also appear in the year-round "All Drinks" catalogue (a `Drink` exists independently of the event; `EventDrink` only links the two). So themed props (pumpkins, pine, citrus) go in the event banner. In drink shots, the only theme allowed is a small accent in the **blurred background**, used the same way in every drink of the event. Replace the back-bar/brass-lamp part with something like "blurred background with a glowing jack-o'-lantern and flickering candles". The foreground keeps only the drink, its glass and its garnish, so the photo still works outside the event. This still has to fit within the 60 words.

## 3. Event banner prompt

The pipeline has no rule for this, so follow the existing banner (`public/images/events/apricot-lovers-2026.png`):

- **landscape 16:9** (1376×768);
- **2–4 signature drinks** from the event, side by side on a linen runner on the same dark wooden bar, each in its correct glass and with its garnish;
- the theme ingredient as props to one side (e.g. a wooden bowl of halved apricots and loose sprigs of herbs);
- Edison bulbs and a brass dome lamp overhead, out-of-focus back-bar bottles, warm amber light. One atmospheric touch such as a wisp of smoke is fine;
- no text, logos or people;
- up to about 80 words. The banner holds more objects than a drink shot, so the 60-word limit for drinks doesn't apply.

## 4. Output

Group the prompts by target file so each can be pasted straight in:

```
public/images/drinks/<sanitized-name>.png  (2:3 portrait)
<prompt>
```

…then the event banner as `public/images/events/<slug>.png` (16:9 landscape). Compute filenames with the same rules as `sanitizeFilename` in `LLM/src/steps/saveRecipe.ts`: lowercase; anything that isn't a-z or 0-9 becomes `-`; collapse repeated dashes; trim dashes from both ends. Use `ls` to mark any target file that already exists, so the user doesn't overwrite it by mistake. Don't output the pipeline's `{"prompt": …}` JSON; that format was only there so the code could parse it.

**Selecting a candidate (only if the user asks):** have the user put the candidates in one folder per drink. View every image and pick the one that best matches the drink, as `buildSimpleSelectionPrompt` does: correct glassware, liquid colour, garnish and ice, plus fit with the house style. Look for artefacts too: warped glass, extra garnishes, garbled text. Say which one you chose and why in one line. Check the aspect ratio with `sips -g pixelWidth -g pixelHeight <file>`. Then copy it to the target path, converting with `sips -s format png` if it isn't a PNG. Ask before overwriting an existing file.
