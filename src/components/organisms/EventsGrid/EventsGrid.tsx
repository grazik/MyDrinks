import { prisma } from "@/db/db";
import { EventCard } from "@/src/components/molecules/EventCard/EventCard";
import { Grid } from "@/src/components/molecules/Grid/Grid";

export const EventsGrid = async () => {
  const events = await prisma.event.findMany({
    orderBy: {
      eventDate: "desc",
    },
  });

  return (
    <Grid cols={{ mobile: 1, tabletLandscape: 2, desktop: 3 }}>
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </Grid>
  );
};
