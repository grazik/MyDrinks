"use client";

import { FilterCategory, useDrinkFilters } from "@/hooks/useDrinkFilters";
import { FilterChipBar } from "@/componets/molecules/FilterChipBar/FilterChipBar";

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
        activeIngredients={activeFilters[FilterCategory.SPIRITS]}
        updateFilers={updateQueryParams(FilterCategory.SPIRITS)}
      />
      <FilterChipBar
        chips={ingredientsNames}
        heading="Filter by other ingredients"
        activeIngredients={activeFilters[FilterCategory.INGREDIENTS]}
        updateFilers={updateQueryParams(FilterCategory.INGREDIENTS)}
      />
    </>
  );
};
