"use client";

import "./toast.scss";

interface ToastProps {
  message: string;
  visible: boolean;
}

export const Toast = ({ message, visible }: ToastProps) => {
  return (
    <div
      className={`toast${visible ? " toast--visible" : ""}`}
      aria-live="polite"
      role="status"
    >
      {message}
    </div>
  );
};
