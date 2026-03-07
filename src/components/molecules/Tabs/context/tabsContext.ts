import { createContext, useContext } from "react";

type TabsContext = {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
};

export const tabsContext = createContext<TabsContext | null>(null);

export const useTabsContext = () => {
  const ctx = useContext(tabsContext);
  if (!ctx) throw new Error("useTabsContext must be used within <Tabs>");
  return ctx;
};
