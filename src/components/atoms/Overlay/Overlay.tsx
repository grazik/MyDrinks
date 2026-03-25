"use client";

import "./overlay.scss";

type OverlayProps = {
  isVisible: boolean;
  onClick: () => void;
};

export const Overlay = ({ isVisible, onClick }: OverlayProps) => {
  return (
    <div
      className={`overlay ${isVisible ? "overlay--visible" : ""}`}
      onClick={onClick}
      aria-hidden="true"
    />
  );
};
