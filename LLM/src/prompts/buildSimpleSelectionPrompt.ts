export const buildSimpleSelectionPrompt = (
  cocktailName: string,
  originalPrompt: string,
): string => {
  return `
You are selecting the best image match for this cocktail.

**Cocktail:** ${cocktailName}

**Original Recipe Context:**
${originalPrompt}

**Task:** Look at the 4 images and select which one (1, 2, 3, or 4) best matches the cocktail described above.

**Response:** Only return the number (1, 2, 3, or 4). Nothing else.`.trim();
};
