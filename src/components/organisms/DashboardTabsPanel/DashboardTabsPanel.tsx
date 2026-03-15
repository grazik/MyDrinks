import { OrderTab } from "@/src/utils/orders/orders";
import {
  HistoryStatusScreen,
  MixingStatusScreen,
  PendingStatusScreen,
  ReadyStatusScreen,
} from "@/src/components/organisms/DashboardStatusScreen/DashboardStatusScreens";
import { OrderWithDrink } from "@/src/types/order.types";
import { OrdersGrid } from "@/src/components/organisms/OrdersGrid/OrdersGrid";
import { OrderCard } from "@/src/components/molecules/OrderCard/OrderCard";
import { ReactNode } from "react";

const STATUS_SCREEN_COMPONENT: { [key in OrderTab]: () => ReactNode } = {
  pending: PendingStatusScreen,
  mixing: MixingStatusScreen,
  ready: ReadyStatusScreen,
  history: HistoryStatusScreen,
};

type DashboardTabsPanelProps = {
  orders: OrderWithDrink[];
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
    <div>
      <OrdersGrid>
        {orders.map((order) => (
          <OrderCard order={order} key={order.id} />
        ))}
      </OrdersGrid>
    </div>
  );
};
