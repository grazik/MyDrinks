"use client";
import { ReactNode, useMemo, useState } from "react";
import { type Event } from "@prisma/client";
import { groupOrdersByTab } from "@/src/utils/orders/orders";
import { OrderWithDrinkWithIngredientsAndUser } from "@/src/types/order.types";
import { DashboardTabs } from "@/src/components/organisms/DashboardTabs/DashboardTabs";
import { RecipePanel } from "@/src/components/organisms/RecipePanel/RecipePanel";
import { SseHandlers, useSse } from "@/src/hooks/useSse";
import { BarEvent } from "@/lib/sse/types";

interface DashboardClientProps {
  initialOrders: OrderWithDrinkWithIngredientsAndUser[] | null;
  initialEvent: Event | null;
  noEventSection: ReactNode;
}

export const DashboardClient = ({
  initialOrders,
  initialEvent,
  noEventSection,
}: DashboardClientProps) => {
  const [orders, setOrders] = useState(initialOrders || []);
  const [activeEvent, setActiveEvent] = useState(initialEvent);

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
      [BarEvent.BAR_CLOSED]: () => {
        setActiveEvent(null);
        setOrders([]);
      },
      [BarEvent.BAR_OPENED]: (event) => setActiveEvent(event),
    };
  }, []);

  const groupedOrders = useMemo(() => groupOrdersByTab(orders), [orders]);

  useSse("/api/sse/dashboard/", sseHandlers);

  if (!activeEvent) {
    return noEventSection;
  }

  return (
    <>
      <DashboardTabs groupedOrders={groupedOrders} />
      <RecipePanel />
    </>
  );
};
