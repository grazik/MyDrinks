import "./events-grid.scss";
import { prisma } from "@/db/db";
import { EventCard } from "@/src/components/molecules/EventCard/EventCard";

export const EventsGrid = async () => {
  const events = await prisma.event.findMany({
    orderBy: {
      eventDate: "desc",
    },
  });

  return (
    <div className="events-grid">
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </div>
  );
};
