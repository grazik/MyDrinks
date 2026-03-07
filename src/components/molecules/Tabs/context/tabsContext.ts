import { createContext, useContext } from "react";

type TabsContext = {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
};

export const tabsContext = createContext<TabsContext>({
  activeTab: "",
  setActiveTab: () => {},
});

export const useTabsContext = () => {
  return useContext(tabsContext);
};
