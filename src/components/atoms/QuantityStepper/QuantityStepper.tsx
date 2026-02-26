import MinusIcon from "public/icons/minus.svg";
import PlusIcon from "public/icons/plus.svg";

import "./quantity-stepper.scss";

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export const QuantityStepper = ({
  value,
  min = 1,
  max = 5,
  onChange,
}: QuantityStepperProps) => {
  return (
    <div className="quantity-stepper">
      <button
        type="button"
        className="quantity-stepper__btn"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <MinusIcon />
      </button>
      <span
        className="quantity-stepper__value"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Quantity: ${value}`}
      >
        {value}
      </span>
      <button
        type="button"
        className="quantity-stepper__btn"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <PlusIcon />
      </button>
    </div>
  );
};
