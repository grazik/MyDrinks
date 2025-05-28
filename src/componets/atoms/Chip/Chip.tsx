"use client";

import { ReactNode, useState } from "react";
import "./chip.scss";

type ChipProps = {
  children: ReactNode;
  onChange?: (isChecked: boolean) => void;
};

export const Chip = ({ children, onChange }: ChipProps) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <button
      className={`button chip ${isChecked ? "chip--active" : ""}`}
      onClick={() => {
        console.log("Asdasd");
        setChecked(!isChecked);
        onChange?.(!isChecked);
      }}
    >
      {children}
    </button>
  );
};
