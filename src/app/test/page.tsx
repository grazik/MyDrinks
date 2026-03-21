"use client";

import { useState } from "react";
import { Drawer } from "@/src/components/molecules/Drawer/Drawer";
import { useBreakpoint } from "@/src/hooks/useBreakpoint";

export default function TestDrawerPage() {
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const breakpoint = useBreakpoint();

  return (
    <main style={{ padding: "2rem", color: "var(--color-text-light)" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Drawer Demo</h1>
      <p style={{ marginBottom: "2rem", color: "var(--color-text-muted)" }}>
        Current breakpoint: <strong>{breakpoint}</strong>
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          className="button"
          style={{
            padding: "0.75rem 1.5rem",
            background: "var(--color-accent-primary)",
            border: "none",
            borderRadius: "12px",
            color: "var(--color-background)",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={() => setIsRightOpen(true)}
        >
          Open Right Drawer
        </button>

        <button
          className="button"
          style={{
            padding: "0.75rem 1.5rem",
            background: "var(--color-surface-base)",
            border: "1px solid var(--color-light-border)",
            borderRadius: "12px",
            color: "var(--color-text-light)",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={() => setIsBottomOpen(true)}
        >
          Open Bottom Drawer
        </button>
      </div>

      <Drawer side="right" isOpen={isRightOpen} onClose={() => setIsRightOpen(false)} label="Right drawer demo">
        <div style={{ padding: "1.5rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Right Drawer</h2>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>
            This slides in from the right. Try pressing Escape or clicking the
            overlay to close it.
          </p>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>
            Focus is trapped inside this drawer while it is open. Tab through
            the elements below to verify.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input
              type="text"
              placeholder="Focusable input"
              style={{
                padding: "0.5rem",
                borderRadius: "8px",
                border: "1px solid var(--color-light-border)",
                background: "var(--color-surface-base)",
                color: "var(--color-text-light)",
              }}
            />
            <button
              className="button"
              style={{
                padding: "0.5rem 1rem",
                background: "var(--color-accent-primary)",
                border: "none",
                borderRadius: "8px",
                color: "var(--color-background)",
                cursor: "pointer",
              }}
              onClick={() => setIsRightOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Drawer>

      <Drawer side="bottom" isOpen={isBottomOpen} onClose={() => setIsBottomOpen(false)} label="Bottom drawer demo">
        <div style={{ padding: "1.5rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Bottom Drawer</h2>
          <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>
            This slides up from the bottom with a drag handle. Try pressing
            Escape or clicking the overlay to close it.
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              className="button"
              style={{
                padding: "0.5rem 1rem",
                background: "var(--color-surface-base)",
                border: "1px solid var(--color-light-border)",
                borderRadius: "8px",
                color: "var(--color-text-light)",
                cursor: "pointer",
              }}
              onClick={() => setIsBottomOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Drawer>
    </main>
  );
}
