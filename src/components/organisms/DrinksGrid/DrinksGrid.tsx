import { prisma } from "../../../../db/db";
import { DrinksGridClient } from "@/src/components/organisms/DrinksGrid/DrinksGridClient";
import { Grid } from "@/src/components/molecules/Grid/Grid";
import { Suspense } from "react";

import "./drinks-grid.scss";

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
    <div className="drinks-grid">
      <Grid cols={{ mobile: 2, tablet: 3, tabletLandscape: 4, desktop: 5 }}>
        <Suspense>
          <DrinksGridClient drinksWithIngredients={drinksWithIngredients} />
        </Suspense>
      </Grid>
    </div>
  );
};
