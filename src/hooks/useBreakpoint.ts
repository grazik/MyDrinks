"use client";

import { useState, useEffect } from "react";
import breakpoints from "@/src/styles/breakpoints.module.scss";

export type Breakpoint = "mobile" | "tablet" | "desktop";

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("mobile");

  useEffect(() => {
    const tabletQuery = window.matchMedia(`(min-width: ${breakpoints.tabletLandscape})`);
    const desktopQuery = window.matchMedia(`(min-width: ${breakpoints.desktop})`);

    const resolve = (): Breakpoint => {
      if (desktopQuery.matches) return "desktop";
      if (tabletQuery.matches) return "tablet";
      return "mobile";
    };

    setBreakpoint(resolve());

    const update = () => setBreakpoint(resolve());

    tabletQuery.addEventListener("change", update);
    desktopQuery.addEventListener("change", update);

    return () => {
      tabletQuery.removeEventListener("change", update);
      desktopQuery.removeEventListener("change", update);
    };
  }, []);

  return breakpoint;
}
