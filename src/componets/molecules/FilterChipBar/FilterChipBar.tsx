import { Chip } from "@/componets/atoms/Chip/Chip";
import "./filter-chip-bar.scss";

type FilterChipBarProps = {
  heading: string;
  chips: string[];
};

export const FilterChipBar = ({ heading, chips }: FilterChipBarProps) => {
  return (
    <div className={"filter-chip-bar"}>
      <h3 className="subsection-heading">{heading} </h3>
      <div className="filter-chip-bar__chips">
        {chips.map((chip) => (
          <Chip key={chip}>{chip}</Chip>
        ))}
      </div>
    </div>
  );
};
