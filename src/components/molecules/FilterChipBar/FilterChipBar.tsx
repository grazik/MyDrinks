import { Chip } from "@/src/components/atoms/Chip/Chip";
import "./filter-chip-bar.scss";

type FilterChipBarProps = {
  heading: string;
  chips: string[];
  activeIngredients: string[] | undefined;
  updateFilers: (ingredientName: string) => void;
};

export const FilterChipBar = ({
  heading,
  chips,
  activeIngredients,
  updateFilers,
}: FilterChipBarProps) => {
  return (
    <div className={"filter-chip-bar"}>
      <h3 className="subsection-heading">{heading} </h3>
      <div className="filter-chip-bar__chips">
        {chips.map((chip) => (
          <Chip
            key={chip}
            isActive={activeIngredients?.includes(chip)}
            onChange={() => updateFilers(chip)}
          >
            {chip}
          </Chip>
        ))}
      </div>
    </div>
  );
};
