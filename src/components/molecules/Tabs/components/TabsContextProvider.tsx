"use client";

import { ReactNode } from "react";
import { tabsContext } from "@/src/components/molecules/Tabs/context/tabsContext";

type TabsContextProviderProps = {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
};

export const TabsContextProvider = ({
  children,
  setActiveTab,
  activeTab,
}: TabsContextProviderProps) => {
  return (
    <tabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </tabsContext.Provider>
  );
};
