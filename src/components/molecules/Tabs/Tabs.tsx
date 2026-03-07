import { ReactNode } from "react";
import { TabsList, TabsPanel, TabsTrigger } from "./components";
import "./tabs.scss";
import { TabsContextProvider } from "@/src/components/molecules/Tabs/components/TabsContextProvider";

type TabsProps = {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
};

export const Tabs = ({ children, activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className="tabs">
      <TabsContextProvider activeTab={activeTab} setActiveTab={setActiveTab}>
        {children}
      </TabsContextProvider>
    </div>
  );
};

Tabs.List = TabsList;
Tabs.Panel = TabsPanel;
Tabs.Trigger = TabsTrigger;
