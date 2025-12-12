"use client";

import { useDrinkFilters } from "@/src/hooks/useDrinkFilters";

import { FilterChipBar } from "@/src/components/molecules/FilterChipBar/FilterChipBar";
import { IngredientCategory } from "@/src/constants/IngredientCategory";

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
        activeIngredients={activeFilters[IngredientCategory.ADDITIONAL]}
        updateFilers={updateQueryParams(IngredientCategory.ADDITIONAL)}
      />
    </>
  );
};
