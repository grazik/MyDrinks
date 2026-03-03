import { Event } from "@prisma/client";
import { H2SectionHeading } from "@/src/components/atoms/SectionHeading/SectionHeading";

type ActiveOrdersSectionProps = {
  event: Event | null;
};

const ActiveOrdersSectionNoEvent = () => {
  return (
    <section>
      <H2SectionHeading>The Bar is Currently Closed</H2SectionHeading>;
      <p className={"body-text"}>
        There are no live events happening right now, but our recipe book is
        always open. Explore our collection to find your next favorite drink, or
        check your past orders for inspiration
      </p>
    </section>
  );
};

const ActiveOrdersSectionWithEvent = async ({}: ActiveOrdersSectionProps) => {
  return (
    <section>
      <H2SectionHeading>Abba</H2SectionHeading>
    </section>
  );
};

export const ActiveOrdersSection = ({ event }: ActiveOrdersSectionProps) => {
  if (!event) {
    return <ActiveOrdersSectionNoEvent />;
  }

  return <ActiveOrdersSectionWithEvent event={event} />;
};
