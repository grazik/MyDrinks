"use client";

import { useEffect, useRef, useState } from "react";
import { Drawer } from "@/src/components/molecules/Drawer/Drawer";
import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import { useBreakpoint } from "@/src/hooks/useBreakpoint";
import {
  IngredientCategory,
  INGREDIENT_CATEGORY_LABELS,
} from "@/src/constants/IngredientCategory";
import {
  ADDITIONAL_INGREDIENT_TYPES_ORDER,
  INGREDIENT_TYPE_LABELS,
} from "@/src/constants/ingredientTypeLabels";
import {
  ActiveDrinkFilters,
  IngredientFilterOption,
} from "@/src/utils/ingredients/ingredients";
import { formatDrinkCount } from "@/src/components/molecules/ActiveFiltersBar/ActiveFiltersBar";
import "./drinks-filter-drawer.scss";

type DrinksFilterDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  spirits: IngredientFilterOption[];
  additional: IngredientFilterOption[];
  activeFilters: ActiveDrinkFilters;
  onToggle: (category: IngredientCategory) => (name: string) => void;
  onClearAll: () => void;
  resultCount: number;
  initialSection?: IngredientCategory;
};

type DrawerContentProps = Omit<DrinksFilterDrawerProps, "isOpen">;

const byName = (a: IngredientFilterOption, b: IngredientFilterOption) =>
  a.name.localeCompare(b.name);

const DrawerContent = ({
  onClose,
  spirits,
  additional,
  activeFilters,
  onToggle,
  onClearAll,
  resultCount,
  initialSection,
}: DrawerContentProps) => {
  const [query, setQuery] = useState("");
  const sectionRefs = useRef<Partial<Record<IngredientCategory, HTMLElement>>>(
    {},
  );

  useEffect(() => {
    if (initialSection) {
      sectionRefs.current[initialSection]?.scrollIntoView({ block: "start" });
    }
  }, [initialSection]);

  const normalizedQuery = query.trim().toLowerCase();
  const matchesQuery = (option: IngredientFilterOption) =>
    option.name.toLowerCase().includes(normalizedQuery);

  const visibleSpirits = spirits.filter(matchesQuery).sort(byName);

  const additionalGroups = ADDITIONAL_INGREDIENT_TYPES_ORDER.map((type) => ({
    type,
    label: INGREDIENT_TYPE_LABELS[type],
    options: additional
      .filter((option) => option.type === type && matchesQuery(option))
      .sort(byName),
  })).filter((group) => group.options.length > 0);

  const nothingMatches =
    visibleSpirits.length === 0 && additionalGroups.length === 0;

  const activeCount =
    (activeFilters[IngredientCategory.SPIRITS]?.length ?? 0) +
    (activeFilters[IngredientCategory.ADDITIONAL]?.length ?? 0);

  const renderChips = (
    category: IngredientCategory,
    options: IngredientFilterOption[],
  ) => (
    <div className="drinks-filter-drawer__chips">
      {options.map(({ name }) => (
        <Chip
          key={name}
          isActive={activeFilters[category]?.includes(name)}
          onChange={() => onToggle(category)(name)}
        >
          {name}
        </Chip>
      ))}
    </div>
  );

  return (
    <div className="drinks-filter-drawer">
      <div className="drinks-filter-drawer__top">
        <div className="drinks-filter-drawer__header">
          <h2 className="subsection-heading">Filters</h2>
          <button
            type="button"
            className="drinks-filter-drawer__close"
            onClick={onClose}
            aria-label="Close filters"
          >
            ×
          </button>
        </div>
        <input
          type="search"
          className="drinks-filter-drawer__search"
          placeholder="Search ingredients"
          aria-label="Search ingredients"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="drinks-filter-drawer__body">
        {nothingMatches && (
          <p className="body-text drinks-filter-drawer__empty">
            No ingredients match “{query.trim()}”
          </p>
        )}

        {visibleSpirits.length > 0 && (
          <section
            className="drinks-filter-drawer__section"
            ref={(node) => {
              sectionRefs.current[IngredientCategory.SPIRITS] =
                node ?? undefined;
            }}
          >
            <h3 className="drinks-filter-drawer__section-heading">
              {INGREDIENT_CATEGORY_LABELS[IngredientCategory.SPIRITS]}
            </h3>
            {renderChips(IngredientCategory.SPIRITS, visibleSpirits)}
          </section>
        )}

        {additionalGroups.length > 0 && (
          <section
            className="drinks-filter-drawer__section"
            ref={(node) => {
              sectionRefs.current[IngredientCategory.ADDITIONAL] =
                node ?? undefined;
            }}
          >
            <h3 className="drinks-filter-drawer__section-heading">
              {INGREDIENT_CATEGORY_LABELS[IngredientCategory.ADDITIONAL]}
            </h3>
            {additionalGroups.map(({ type, label, options }) => (
              <div key={type} className="drinks-filter-drawer__group">
                <h4 className="drinks-filter-drawer__group-heading">{label}</h4>
                {renderChips(IngredientCategory.ADDITIONAL, options)}
              </div>
            ))}
          </section>
        )}
      </div>

      <div className="drinks-filter-drawer__footer">
        <button
          type="button"
          className="button drinks-filter-drawer__clear"
          onClick={onClearAll}
          disabled={activeCount === 0}
        >
          Clear all
        </button>
        <Cta onClick={onClose}>Show {formatDrinkCount(resultCount)}</Cta>
      </div>
    </div>
  );
};

export const DrinksFilterDrawer = ({
  isOpen,
  ...contentProps
}: DrinksFilterDrawerProps) => {
  const breakpoint = useBreakpoint();

  return (
    <Drawer
      side={breakpoint === "mobile" ? "bottom" : "right"}
      isOpen={isOpen}
      onClose={contentProps.onClose}
      label="Drink filters"
    >
      {isOpen && <DrawerContent {...contentProps} />}
    </Drawer>
  );
};
