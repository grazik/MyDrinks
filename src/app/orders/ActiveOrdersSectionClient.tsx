"use client";

import { useState, useMemo, ReactNode } from "react";
import { type OrderWithDrink } from "@/src/types/order.types";
import { type Event } from "@prisma/client";

import { STATUS_ORDERING } from "@/src/constants/order";
import { OrderCard } from "@/src/components/molecules/OrderCard/OrderCard";
import { SseHandlers, useSse } from "@/src/hooks/useSse";
import { BarEvent } from "@/lib/sse/types";
import { H2SectionHeading } from "@/src/components/atoms/SectionHeading/SectionHeading";
import { OrdersGrid } from "@/src/components/organisms/OrdersGrid/OrdersGrid";

interface ActiveOrdersSectionClientProps {
  initialOrders: OrderWithDrink[] | null;
  initialEvent: Event | null;
  noEventSection: ReactNode;
}

export const ActiveOrdersSectionClient = ({
  initialOrders,
  initialEvent,
  noEventSection,
}: ActiveOrdersSectionClientProps) => {
  const [activeEvent, setActiveEvent] = useState(initialEvent);
  const [userOrders, setUserOrders] = useState(initialOrders || []);

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
      [BarEvent.BAR_CLOSED]: () => {
        setActiveEvent(null);
        setUserOrders([]);
      },
      [BarEvent.BAR_OPENED]: (payload) => setActiveEvent(payload),
    }),
    [],
  );

  useSse("/api/sse/my-orders/", sseHandlers);

  if (!activeEvent) {
    return noEventSection;
  }

  return (
    <section>
      <H2SectionHeading>Bar is opened - {activeEvent.title}</H2SectionHeading>
      <OrdersGrid>
        {sortedOrders.map((order) => (
          <OrderCard order={order} key={order.id} />
        ))}
      </OrdersGrid>
    </section>
  );
};
