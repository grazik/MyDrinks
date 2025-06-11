"use client";

import { useDrinkFilters } from "@/hooks/useDrinkFilters";

import { FilterChipBar } from "@/components/molecules/FilterChipBar/FilterChipBar";
import { IngredientCategory } from "@/constants/IngredientCategory";

type DrinksFilterClientProps = {
  spiritNames: string[];
  ingredientsNames: string[];
};

export const DrinksFilterClient = ({
  spiritNames,
  ingredientsNames,
}: DrinksFilterClientProps) => {
  const [activeFilters, updateQueryParams] = useDrinkFilters();

  return (
    <>
      <FilterChipBar
        heading="Filter by Main Spirit"
        chips={spiritNames}
        activeIngredients={activeFilters[IngredientCategory.SPIRITS]}
        updateFilers={updateQueryParams(IngredientCategory.SPIRITS)}
      />
      <FilterChipBar
        chips={ingredientsNames}
        heading="Filter by other ingredients"
        activeIngredients={activeFilters[IngredientCategory.INGREDIENTS]}
        updateFilers={updateQueryParams(IngredientCategory.INGREDIENTS)}
      />
    </>
  );
};
