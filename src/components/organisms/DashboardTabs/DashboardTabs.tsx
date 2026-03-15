"use client";
import { Tabs } from "@/src/components/molecules/Tabs/Tabs";
import { OrderTab, GroupedOrders } from "@/src/utils/orders/orders";
import { OrderWithDrink } from "@/src/types/order.types";
import { DashboardTabsPanel } from "@/src/components/organisms/DashboardTabsPanel/DashboardTabsPanel";

const TABS_CONFIG: { name: OrderTab; label: string }[] = [
  { name: "pending", label: "Pending" },
  { name: "mixing", label: "Mixing" },
  { name: "ready", label: "Ready" },
  { name: "history", label: "⏰ History" },
];

type DashboardTabsProps = {
  groupedOrders: GroupedOrders<OrderWithDrink>;
};

export const DashboardTabs = ({ groupedOrders }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue={TABS_CONFIG[0].name}>
      <Tabs.List>
        {TABS_CONFIG.map(({ name, label }) => {
          const orders = groupedOrders[name] ?? [];
          return (
            <Tabs.Trigger key={name} value={name}>
              {label} ({orders.length})
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      {TABS_CONFIG.map(({ name }) => (
        <Tabs.Panel key={name} value={name}>
          <DashboardTabsPanel
            orders={groupedOrders[name] ?? []}
            variant={name}
          />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
