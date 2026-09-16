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
import { useRecentlyUpdated } from "@/src/hooks/useRecentlyUpdated";
import { withViewTransition } from "@/src/utils/viewTransition";

// Outlasts the glow's own delay + duration so the card keeps the class until
// the animation has finished.
const HIGHLIGHT_DURATION_MS = 2000;

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

  const { markUpdated, isRecentlyUpdated } =
    useRecentlyUpdated(HIGHLIGHT_DURATION_MS);

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
      [BarEvent.USER_ORDER_UPDATED]: (payload) => {
        markUpdated(payload.id);

        // Deliberately not on USER_ALL_ORDERS: a resync reorders the whole
        // list, and animating every card at once reads as noise.
        withViewTransition(() =>
          setUserOrders((prevOrders) =>
            prevOrders.filter((o) => o.id !== payload.id).concat(payload),
          ),
        );
      },
      [BarEvent.BAR_CLOSED]: () => {
        setActiveEvent(null);
        setUserOrders([]);
      },
      [BarEvent.BAR_OPENED]: (payload) => setActiveEvent(payload),
    }),
    [markUpdated],
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
          <OrderCard
            order={order}
            key={order.id}
            isRecentlyUpdated={isRecentlyUpdated(order.id)}
          />
        ))}
      </OrdersGrid>
    </section>
  );
};
