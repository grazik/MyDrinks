"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const useRecentlyUpdated = (durationMs: number) => {
  const [ids, setIds] = useState<ReadonlySet<string>>(new Set());
  const timeouts = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const markUpdated = useCallback(
    (id: string) => {
      // Without this, a second update inside the window lets the first
      // timeout cut the highlight short.
      clearTimeout(timeouts.current.get(id));

      setIds((prev) => new Set(prev).add(id));

      timeouts.current.set(
        id,
        setTimeout(() => {
          timeouts.current.delete(id);
          setIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }, durationMs),
      );
    },
    [durationMs],
  );

  useEffect(() => {
    const pending = timeouts.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const isRecentlyUpdated = useCallback((id: string) => ids.has(id), [ids]);

  return { markUpdated, isRecentlyUpdated };
};
