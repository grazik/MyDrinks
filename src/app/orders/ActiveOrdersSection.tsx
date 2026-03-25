import { Event, OrderStatus } from "@prisma/client";
import { H2SectionHeading } from "@/src/components/atoms/SectionHeading/SectionHeading";
import { getMyOrdersForEvent } from "@/dal/orders";
import { OrderCard } from "@/src/components/molecules/OrderCard/OrderCard";
import { OrdersGrid } from "@/src/components/organisms/OrdersGrid/OrdersGrid";

const ActiveOrdersSectionNoEvent = () => {
  return (
    <section>
      <H2SectionHeading>The Bar is Currently Closed</H2SectionHeading>
      <p className={"body-text"}>
        There are no live events happening right now, but our recipe book is
        always open. Explore our collection to find your next favorite drink, or
        check your past orders for inspiration
      </p>
    </section>
  );
};

const STATUS_ORDERING: Record<OrderStatus, number> = {
  [OrderStatus.READY]: 0,
  [OrderStatus.MIXING]: 1,
  [OrderStatus.PENDING]: 2,
  [OrderStatus.COMPLETED]: 3,
  [OrderStatus.CANCELLED]: 4,
};

const ActiveOrdersSectionWithEvent = async ({ event }: { event: Event }) => {
  const userOrders = await getMyOrdersForEvent(event.id);

  const sortedOrders = userOrders.toSorted(
    (a, b) => STATUS_ORDERING[a.status] - STATUS_ORDERING[b.status],
  );

  return (
    <section>
      <H2SectionHeading>Abba</H2SectionHeading>
      <OrdersGrid>
        {sortedOrders.map((order) => (
          <OrderCard order={order} key={order.id} />
        ))}
      </OrdersGrid>
    </section>
  );
};

type ActiveOrdersSectionProps = {
  event: Event | null;
};

export const ActiveOrdersSection = ({ event }: ActiveOrdersSectionProps) => {
  if (!event) {
    return <ActiveOrdersSectionNoEvent />;
  }

  return <ActiveOrdersSectionWithEvent event={event} />;
};
