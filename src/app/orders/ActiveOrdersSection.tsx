import { Event } from "@prisma/client";
import { H2SectionHeading } from "@/src/components/atoms/SectionHeading/SectionHeading";
import { getCurrentUserOrdersForEvent } from "@/lib/orders/getOrders";
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

const ActiveOrdersSectionWithEvent = async ({ event }: { event: Event }) => {
  const userOrders = await getCurrentUserOrdersForEvent(event);

  return (
    <section>
      <H2SectionHeading>Abba</H2SectionHeading>
      <OrdersGrid>
        {userOrders?.map((order) => <OrderCard order={order} key={order.id} />)}
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
