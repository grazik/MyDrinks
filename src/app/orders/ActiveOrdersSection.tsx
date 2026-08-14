import { Event } from "@prisma/client";
import { H2SectionHeading } from "@/src/components/atoms/SectionHeading/SectionHeading";
import { getMyOrdersForEvent } from "@/dal/orders";
import { ActiveOrdersSectionClient } from "@/src/app/orders/ActiveOrdersSectionClient";

type ActiveOrdersSectionProps = {
  event: Event | null;
};

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

export const ActiveOrdersSection = async ({
  event,
}: ActiveOrdersSectionProps) => {
  const userOrders = event && (await getMyOrdersForEvent(event.id));

  return (
    <ActiveOrdersSectionClient
      initialOrders={userOrders}
      initialEvent={event}
      noEventSection={<ActiveOrdersSectionNoEvent />}
    />
  );
};
