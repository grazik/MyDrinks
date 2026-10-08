"use client";

import { useState } from "react";
import { useDrinkFilters } from "@/src/hooks/useDrinkFilters";
import { FilterChipBar } from "@/src/components/molecules/FilterChipBar/FilterChipBar";
import { ActiveFiltersBar } from "@/src/components/molecules/ActiveFiltersBar/ActiveFiltersBar";
import { DrinksFilterDrawer } from "@/src/components/organisms/DrinksFilterDrawer/DrinksFilterDrawer";
import { IngredientCategory } from "@/src/constants/IngredientCategory";
import {
  IngredientFilterOption,
  matchesDrinkFilters,
} from "@/src/utils/ingredients/ingredients";

const VISIBLE_SPIRITS = 8;
const VISIBLE_ADDITIONAL = 12;

type DrinksFilterClientProps = {
  spirits: IngredientFilterOption[];
  additional: IngredientFilterOption[];
  drinkIngredientNames: string[][];
};

type DrawerState = {
  isOpen: boolean;
  section?: IngredientCategory;
};

export const DrinksFilterClient = ({
  spirits,
  additional,
  drinkIngredientNames,
}: DrinksFilterClientProps) => {
  const {
    activeFilters,
    activeFilterNames,
    toggleFilter,
    removeFilter,
    clearFilters,
  } = useDrinkFilters();
  const [drawer, setDrawer] = useState<DrawerState>({ isOpen: false });

  const openDrawer = (section?: IngredientCategory) =>
    setDrawer({ isOpen: true, section });
  const closeDrawer = () => setDrawer({ isOpen: false });

  const resultCount = drinkIngredientNames.filter((names) =>
    matchesDrinkFilters(names, activeFilters),
  ).length;

  return (
    <>
      <FilterChipBar
        heading="Filter by Main Spirit"
        chips={spirits.map(({ name }) => name)}
        activeIngredients={activeFilters[IngredientCategory.SPIRITS]}
        onToggle={toggleFilter(IngredientCategory.SPIRITS)}
        visibleLimit={VISIBLE_SPIRITS}
        onShowAll={() => openDrawer(IngredientCategory.SPIRITS)}
      />
      <FilterChipBar
        heading="Filter by other ingredients"
        chips={additional.map(({ name }) => name)}
        activeIngredients={activeFilters[IngredientCategory.ADDITIONAL]}
        onToggle={toggleFilter(IngredientCategory.ADDITIONAL)}
        visibleLimit={VISIBLE_ADDITIONAL}
        onShowAll={() => openDrawer(IngredientCategory.ADDITIONAL)}
      />
      <ActiveFiltersBar
        resultCount={resultCount}
        appliedFilters={activeFilterNames}
        onRemove={removeFilter}
        onClearAll={clearFilters}
        onOpenAllFilters={() => openDrawer()}
      />
      <DrinksFilterDrawer
        isOpen={drawer.isOpen}
        initialSection={drawer.section}
        onClose={closeDrawer}
        spirits={spirits}
        additional={additional}
        activeFilters={activeFilters}
        onToggle={toggleFilter}
        onClearAll={clearFilters}
        resultCount={resultCount}
      />
    </>
  );
};
