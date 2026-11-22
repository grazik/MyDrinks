"use client";

import { useState } from "react";
import { useDrinkFilters } from "@/src/hooks/useDrinkFilters";
import { FilterChipBar } from "@/src/components/molecules/FilterChipBar/FilterChipBar";
import { ActiveFiltersBar } from "@/src/components/molecules/ActiveFiltersBar/ActiveFiltersBar";
import { SegmentedControl } from "@/src/components/molecules/SegmentedControl/SegmentedControl";
import { DrinksFilterDrawer } from "@/src/components/organisms/DrinksFilterDrawer/DrinksFilterDrawer";
import { IngredientCategory } from "@/src/constants/IngredientCategory";
import { DRINK_TYPE_LABELS, DrinkType } from "@/src/constants/DrinkType";
import { IngredientFilterOption } from "@/src/utils/ingredients/ingredients";

const VISIBLE_SPIRITS = 8;
const VISIBLE_ADDITIONAL = 12;

const DRINK_TYPE_OPTIONS = Object.values(DrinkType).map((drinkType) => ({
  value: drinkType,
  label: DRINK_TYPE_LABELS[drinkType],
}));

type DrinksFilterProps = {
  spirits: IngredientFilterOption[];
  additional: IngredientFilterOption[];
  resultCount: number;
};

type DrawerState = {
  isOpen: boolean;
  section?: IngredientCategory;
};

export const DrinksFilter = ({
  spirits,
  additional,
  resultCount,
}: DrinksFilterProps) => {
  const {
    activeFilters,
    activeFilterNames,
    drinkType,
    toggleFilter,
    removeFilter,
    clearFilters,
    setDrinkType,
  } = useDrinkFilters();
  const [drawer, setDrawer] = useState<DrawerState>({ isOpen: false });

  const openDrawer = (section?: IngredientCategory) =>
    setDrawer({ isOpen: true, section });
  const closeDrawer = () => setDrawer({ isOpen: false });

  const isMocktailView = drinkType === DrinkType.MOCKTAIL;

  return (
    <>
      <SegmentedControl
        label="Drink type"
        options={DRINK_TYPE_OPTIONS}
        value={drinkType}
        onChange={setDrinkType}
      />
      {!isMocktailView && (
        <FilterChipBar
          heading="Filter by Main Spirit"
          chips={spirits.map(({ name }) => name)}
          activeIngredients={activeFilters[IngredientCategory.SPIRITS]}
          onToggle={toggleFilter(IngredientCategory.SPIRITS)}
          visibleLimit={VISIBLE_SPIRITS}
          onShowAll={() => openDrawer(IngredientCategory.SPIRITS)}
        />
      )}
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
        spirits={isMocktailView ? [] : spirits}
        additional={additional}
        activeFilters={activeFilters}
        onToggle={toggleFilter}
        onClearAll={clearFilters}
        resultCount={resultCount}
      />
    </>
  );
};
