"use client";
import { ReactNode } from "react";

import "./tabs-trigger.scss";
import { useTabsContext } from "@/src/components/molecules/Tabs/context/tabsContext";

type TabsTriggerProps = {
  value: string;
  children: ReactNode;
};

export const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
  const { activeTab, setActiveTab } = useTabsContext();
  return (
    <button
      type="button"
      aria-selected={activeTab === value}
      className="tabs-trigger body-text"
      id={`tab-${value}`}
      aria-controls={`tabpanel-${value}`}
      onClick={() => setActiveTab(value)}
      role="tab"
    >
      {children}
    </button>
  );
};
