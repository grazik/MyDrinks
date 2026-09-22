import { flushSync } from "react-dom";

// The "after" snapshot is taken the moment the callback returns, so the update
// MUST be flushed synchronously or the transition animates nothing.
export const withViewTransition = (update: () => void) => {
  if (typeof document.startViewTransition !== "function") {
    update();
    return;
  }

  document.startViewTransition(() => {
    flushSync(update);
  });
};
