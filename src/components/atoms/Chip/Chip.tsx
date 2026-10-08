"use client";

import { ReactNode } from "react";
import "./chip.scss";

type ChipProps = {
  children: ReactNode;
  onChange?: (isChecked: boolean) => void;
  isActive?: boolean;
  removable?: boolean;
  fill?: "solid" | "outline";
};

export const Chip = ({
  children,
  onChange,
  isActive = false,
  removable = false,
  fill = "solid",
}: ChipProps) => {
  const classNames = [
    "button",
    "chip",
    `chip--fill-${fill}`,
    isActive && "chip--active",
    removable && "chip--removable",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={classNames}
      aria-pressed={removable ? undefined : isActive}
      aria-label={
        removable && typeof children === "string"
          ? `Remove ${children} filter`
          : undefined
      }
      onClick={() => {
        onChange?.(!isActive);
      }}
    >
      {children}
      {removable && (
        <span className="chip__remove" aria-hidden="true">
          ×
        </span>
      )}
    </button>
  );
};
