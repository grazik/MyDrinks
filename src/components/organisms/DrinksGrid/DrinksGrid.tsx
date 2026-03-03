import { prisma } from "../../../../db/db";
import { DrinksGridClient } from "@/src/components/organisms/DrinksGrid/DrinksGridClient";
import { Grid } from "@/src/components/molecules/Grid/Grid";
import { Suspense } from "react";

export const DrinksGrid = async () => {
  const drinksWithIngredients = await prisma.drink.findMany({
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  return (
    <Grid cols={{ mobile: 2, tablet: 3, tabletLandscape: 4, desktop: 5 }}>
      <Suspense>
        <DrinksGridClient drinksWithIngredients={drinksWithIngredients} />
      </Suspense>
    </Grid>
  );
};
