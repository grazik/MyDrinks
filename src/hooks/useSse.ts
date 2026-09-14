"use client";

import { useEffect, useRef } from "react";
import { BarEvent, BarEventPayloads } from "@/lib/sse/types";
import { parseSseData } from "@/src/utils/sse";

export type SseHandlers = {
  [E in BarEvent]?: (data: BarEventPayloads[E]) => void;
};

export const useSse = (path: string, handlers: SseHandlers) => {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    const source = new EventSource(path);

    const attachedHandlers = Object.entries(handlersRef.current).map(
      ([name, handler]) => {
        const listener = (event: MessageEvent<string>) =>
          (handler as (data: unknown) => void)(parseSseData(event.data));

        source.addEventListener(name, listener);
        return [name, listener] as const;
      },
    );

    return () => {
      attachedHandlers.forEach(([name, listener]) => {
        source.removeEventListener(name, listener);
      });
      source.close();
    };
  }, [path]);
};
