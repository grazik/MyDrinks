"use client";

import { ReactNode, useState } from "react";
import "./pill.scss";

type PillProps = {
  children: ReactNode;
  onChange?: (isChecked: boolean) => void;
};

export const Pill = ({ children, onChange }: PillProps) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <button
      className={`button pill ${isChecked ? "pill--active" : ""}`}
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
