import { Chip } from "@/src/components/atoms/Chip/Chip";
import "./filter-chip-bar.scss";

type FilterChipBarProps = {
  heading: string;
  chips: string[];
  activeIngredients: string[] | undefined;
  onToggle: (ingredientName: string) => void;
  visibleLimit?: number;
  onShowAll?: () => void;
};

export const FilterChipBar = ({
  heading,
  chips,
  activeIngredients,
  onToggle,
  visibleLimit,
  onShowAll,
}: FilterChipBarProps) => {
  const visibleChips = chips.slice(0, visibleLimit);
  const hiddenCount = chips.length - visibleChips.length;

  return (
    <div className="filter-chip-bar">
      <h3 className="subsection-heading">{heading}</h3>
      <div className="filter-chip-bar__chips">
        {visibleChips.map((chip) => (
          <Chip
            key={chip}
            isActive={activeIngredients?.includes(chip)}
            onChange={() => onToggle(chip)}
          >
            {chip}
          </Chip>
        ))}
        {hiddenCount > 0 && onShowAll && (
          <Chip fill="outline" onChange={onShowAll}>
            + {hiddenCount} more
          </Chip>
        )}
      </div>
    </div>
  );
};
