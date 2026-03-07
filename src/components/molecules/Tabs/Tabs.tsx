"use client";
import { ReactNode, useState } from "react";
import { TabsList, TabsPanel, TabsTrigger } from "./components";
import "./tabs.scss";
import { TabsContextProvider } from "@/src/components/molecules/Tabs/components/TabsContextProvider";

type BaseProps = {
  children: ReactNode;
  defaultValue?: string;
};

type ControlledProps = BaseProps & {
  value: string;
  onValueChange: (value: string) => void;
};

type UncontrolledProps = BaseProps & {
  value?: never;
  onValueChange?: never;
};

type TabsProps = ControlledProps | UncontrolledProps;

export const Tabs = ({ children, defaultValue = "", value, onValueChange }: TabsProps) => {
  const [internalTab, setInternalTab] = useState(defaultValue);

  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalTab;
  const setActiveTab = isControlled ? onValueChange : setInternalTab;

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
