"use client";

import { Chip } from "@/src/components/atoms/Chip/Chip";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import "./active-filters-bar.scss";

type ActiveFiltersBarProps = {
  resultCount: number;
  appliedFilters: string[];
  onRemove: (ingredientName: string) => void;
  onClearAll: () => void;
  onOpenAllFilters: () => void;
};

export const formatDrinkCount = (count: number) => {
  if (count === 0) return "No drinks match";
  if (count === 1) return "1 drink";
  return `${count} drinks`;
};

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
          {appliedFilters.map((name) => (
            <Chip key={name} isActive removable onChange={() => onRemove(name)}>
              {name}
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
