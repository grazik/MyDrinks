"use client";

import { ReactNode, useEffect, useRef, useCallback } from "react";
import { Overlay } from "@/src/components/atoms/Overlay/Overlay";
import { DragHandle } from "@/src/components/atoms/DragHandle/DragHandle";
import "./drawer.scss";

type DrawerProps = {
  side: "right" | "bottom";
  isOpen: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
};

export const Drawer = ({
  side,
  isOpen,
  onClose,
  label,
  children,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onCloseRef.current();
      return;
    }

    if (e.key === "Tab" && drawerRef.current) {
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
      document.addEventListener("keydown", handleKeyDown);
      drawerRef.current?.focus();
    } else {
      const prev = previouslyFocusedRef.current;
      if (prev?.isConnected) prev.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <>
      <Overlay isVisible={isOpen} onClick={onClose} />
      <div
        ref={drawerRef}
        className={`drawer drawer--${side}`}
        data-open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
      >
        {side === "bottom" && <DragHandle />}
        {children}
      </div>
    </>
  );
};
