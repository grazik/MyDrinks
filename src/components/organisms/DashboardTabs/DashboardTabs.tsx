"use client";
import { Tabs } from "@/src/components/molecules/Tabs/Tabs";
import { ReactNode } from "react";

const TabsOrder = [
  { name: "pendingTab", label: "Pending" },
  { name: "mixingTab", label: "Mixing" },
  { name: "readyTab", label: "Ready" },
  { name: "historyTab", label: "⏰ History" },
] as const;

type TabPanels = {
  [key in (typeof TabsOrder)[number]["name"]]: ReactNode;
};

type DashboardTabsProps = {
  tabs: TabPanels;
};

export const DashboardTabs = ({ tabs }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue={TabsOrder[0].name}>
      <Tabs.List>
        {TabsOrder.map(({ name, label }) => (
          <Tabs.Trigger key={name} value={name}>
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {TabsOrder.map(({ name }) => (
        <Tabs.Panel key={name} value={name}>
          {tabs[name] ?? null}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
