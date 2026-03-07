"use client";

import { ReactNode } from "react";
import { useTabsContext } from "@/src/components/molecules/Tabs/context/tabsContext";

type TabsPanelProps = {
  children: ReactNode;
  value: string;
};

export const TabsPanel = ({ children, value }: TabsPanelProps) => {
  const { activeTab } = useTabsContext();

  if (activeTab !== value) return null;

  return (
    <div
      aria-labelledby={`tab-${value}`}
      id={`tabpanel-${value}`}
      role="tabpanel"
    >
      {children}
    </div>
  );
};
