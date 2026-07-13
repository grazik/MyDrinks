"use client";
import { useMemo, useState } from "react";
import { groupOrdersByTab } from "@/src/utils/orders/orders";
import { OrderWithDrinkWithIngredientsAndUser } from "@/src/types/order.types";
import { DashboardTabs } from "@/src/components/organisms/DashboardTabs/DashboardTabs";
import { RecipePanel } from "@/src/components/organisms/RecipePanel/RecipePanel";
import { SseHandlers, useSse } from "@/src/hooks/useSse";
import { BarEvent } from "@/lib/sse/types";

interface DashboardClientProps {
  initialOrders: OrderWithDrinkWithIngredientsAndUser[];
}

export const DashboardClient = ({ initialOrders }: DashboardClientProps) => {
  const [orders, setOrders] = useState(initialOrders);

  const sseHandlers = useMemo<SseHandlers>(() => {
    return {
      [BarEvent.ALL_ORDERS]: (allOrders) => {
        setOrders(allOrders);
      },
      [BarEvent.ORDER_UPDATED]: (order) => {
        setOrders((prev) =>
          prev.some(({ id }) => id === order.id)
            ? prev.map((existing) =>
                existing.id === order.id ? order : existing,
              )
            : [...prev, order],
        );
      },
    };
  }, []);

  const groupedOrders = useMemo(() => groupOrdersByTab(orders), [orders]);

  useSse("/api/sse/dashboard/", sseHandlers);

  return (
    <>
      <DashboardTabs groupedOrders={groupedOrders} />
      <RecipePanel />
    </>
  );
};
