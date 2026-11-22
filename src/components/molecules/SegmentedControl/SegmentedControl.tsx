import "./segmented-control.scss";

type SegmentedControlOption<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  label: string;
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export const SegmentedControl = <T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) => (
  <div
    className={["segmented-control", className].filter(Boolean).join(" ")}
    role="group"
    aria-label={label}
  >
    {options.map((option) => {
      const isSelected = option.value === value;

      return (
        <button
          key={option.value}
          type="button"
          className={`button segmented-control__option${isSelected ? " segmented-control__option--selected" : ""}`}
          aria-pressed={isSelected}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);
