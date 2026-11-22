import { DrinkWithIngredients } from "@/src/components/organisms/DrinksGrid/DrinkGrid";
import { DrinkCard } from "@/src/components/molecules/DrinkCard/DrinkCard";
import { Grid } from "@/src/components/molecules/Grid/Grid";
import { isMocktail } from "@/src/utils/drinks/drinks";

import "./drinks-grid.scss";

type DrinksGridProps = {
  drinks: DrinkWithIngredients[];
};

export const DrinksGrid = ({ drinks }: DrinksGridProps) => (
  <div className="drinks-grid">
    <Grid cols={{ mobile: 2, tablet: 3, tabletLandscape: 4, desktop: 5 }}>
      {drinks.map((drink) => (
        <DrinkCard
          drink={drink}
          isMocktail={isMocktail(drink)}
          key={drink.id}
        />
      ))}
    </Grid>
  </div>
);
