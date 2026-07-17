"use client";

import { useState, useMemo } from "react";
import { type OrderWithDrink } from "@/src/types/order.types";

import { STATUS_ORDERING } from "@/src/constants/order";
import { OrderCard } from "@/src/components/molecules/OrderCard/OrderCard";
import { SseHandlers, useSse } from "@/src/hooks/useSse";
import { BarEvent } from "@/lib/sse/types";

interface ActiveOrdersSectionClientProps {
  initialOrders: OrderWithDrink[];
}

export const ActiveOrdersSectionClient = ({
  initialOrders,
}: ActiveOrdersSectionClientProps) => {
  const [userOrders, setUserOrders] = useState(initialOrders);

  const sortedOrders = useMemo(
    () =>
      userOrders.toSorted(
        (a, b) => STATUS_ORDERING[a.status] - STATUS_ORDERING[b.status],
      ),
    [userOrders],
  );

  const sseHandlers = useMemo<SseHandlers>(
    () => ({
      [BarEvent.USER_ALL_ORDERS]: (payload) => setUserOrders(payload),
      [BarEvent.USER_ORDER_UPDATED]: (payload) =>
        setUserOrders((prevOrders) =>
          prevOrders.filter((o) => o.id !== payload.id).concat(payload),
        ),
    }),
    [],
  );

  useSse("/api/sse/my-orders/", sseHandlers);

  return (
    <>
      {sortedOrders.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </>
  );
};
