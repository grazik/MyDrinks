"use client";

import "./toast.scss";

interface ToastProps {
  message: string;
  visible: boolean;
  variant?: "success" | "error";
}

export const Toast = ({ message, visible, variant = "success" }: ToastProps) => {
  const isError = variant === "error";

  return (
    <div
      className={`toast toast--${variant}${visible ? " toast--visible" : ""}`}
      aria-live={isError ? "assertive" : "polite"}
      role={isError ? "alert" : "status"}
    >
      {message}
    </div>
  );
};
