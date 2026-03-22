import { OrderTab } from "@/src/utils/orders/orders";
import {
  HistoryStatusScreen,
  MixingStatusScreen,
  PendingStatusScreen,
  ReadyStatusScreen,
} from "@/src/components/organisms/DashboardStatusScreen/DashboardStatusScreens";
import { OrderWithDrinkWithIngredientsAndUser } from "@/src/types/order.types";
import { OrdersGrid } from "@/src/components/organisms/OrdersGrid/OrdersGrid";
import { ReactNode } from "react";
import { BartenderOrderCard } from "@/src/components/molecules/BartenderOrderCard/BartenderOrderCard";

const STATUS_SCREEN_COMPONENT: { [key in OrderTab]: () => ReactNode } = {
  pending: PendingStatusScreen,
  mixing: MixingStatusScreen,
  ready: ReadyStatusScreen,
  history: HistoryStatusScreen,
};

type DashboardTabsPanelProps = {
  orders: OrderWithDrinkWithIngredientsAndUser[];
  variant: OrderTab;
};

export const DashboardTabsPanel = ({
  orders,
  variant,
}: DashboardTabsPanelProps) => {
  if (orders.length === 0) {
    const StatusScreen = STATUS_SCREEN_COMPONENT[variant];
    return <StatusScreen />;
  }

  return (
    <OrdersGrid cols={variant === "history" ? { mobile: 1 } : undefined}>
      {orders.map((order) => (
        <BartenderOrderCard order={order} key={order.id} />
      ))}
    </OrdersGrid>
  );
};
