"use client";

import "./toggle-switch.scss";

type ToggleSwitchProps = {
  label: string;
  hint?: string;
  isChecked: boolean;
  isDisabled?: boolean;
  onChange: (isChecked: boolean) => void;
  className?: string;
};

export const ToggleSwitch = ({
  label,
  hint,
  isChecked,
  isDisabled = false,
  onChange,
  className,
}: ToggleSwitchProps) => {
  const classNames = [
    "toggle-switch",
    isChecked && "toggle-switch--checked",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      className={classNames}
      disabled={isDisabled}
      onClick={() => onChange(!isChecked)}
    >
      <span className="toggle-switch__text">
        <span className="toggle-switch__label">{label}</span>
        {hint && <span className="toggle-switch__hint">{hint}</span>}
      </span>
      <span className="toggle-switch__track" aria-hidden="true">
        <span className="toggle-switch__knob" />
      </span>
    </button>
  );
};
