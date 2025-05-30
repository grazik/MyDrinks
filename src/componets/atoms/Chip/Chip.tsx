"use client";

import { ReactNode, useState } from "react";
import "./chip.scss";

type ChipProps = {
  children: ReactNode;
  onChange?: (isChecked: boolean) => void;
  isActive?: boolean;
};

export const Chip = ({ children, onChange, isActive = false }: ChipProps) => {
  return (
    <button
      className={`button chip ${isActive ? "chip--active" : ""}`}
      onClick={() => {
        onChange?.(!isActive);
      }}
    >
      {children}
    </button>
  );
};
