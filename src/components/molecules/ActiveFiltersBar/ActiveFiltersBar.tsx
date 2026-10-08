"use client";

import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import { IngredientCategory } from "@/src/constants/IngredientCategory";
import "./active-filters-bar.scss";

export type AppliedFilter = {
  category: IngredientCategory;
  name: string;
};

type ActiveFiltersBarProps = {
  resultCount: number;
  appliedFilters: AppliedFilter[];
  onRemove: (filter: AppliedFilter) => void;
  onClearAll: () => void;
  onOpenAllFilters: () => void;
};

export const formatDrinkCount = (count: number) =>
  count === 0 ? "No drinks match" : `${count} ${count === 1 ? "drink" : "drinks"}`;

export const ActiveFiltersBar = ({
  resultCount,
  appliedFilters,
  onRemove,
  onClearAll,
  onOpenAllFilters,
}: ActiveFiltersBarProps) => {
  const hasFilters = appliedFilters.length > 0;

  return (
    <div className="active-filters-bar">
      <p className="active-filters-bar__count body-text" aria-live="polite">
        {formatDrinkCount(resultCount)}
      </p>

      {hasFilters && (
        <div className="active-filters-bar__chips">
          {appliedFilters.map((filter) => (
            <Chip
              key={`${filter.category}:${filter.name}`}
              isActive
              removable
              onChange={() => onRemove(filter)}
            >
              {filter.name}
            </Chip>
          ))}
          <button
            type="button"
            className="button active-filters-bar__clear"
            onClick={onClearAll}
          >
            Clear all
          </button>
        </div>
      )}

      <Cta
        fill="outline"
        className="active-filters-bar__all"
        onClick={onOpenAllFilters}
      >
        All filters{hasFilters && ` (${appliedFilters.length})`}
      </Cta>
    </div>
  );
};
