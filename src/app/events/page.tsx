import { EventsGrid } from "@/src/components/organisms/EventsGrid/EventsGrid";
import { HeroBanner } from "@/src/components/molecules/HeroBanner/HeroBanner";
import { PageNav } from "@/src/components/organisms/PageNav/PageNav";

export const metadata = {
  title: "Events",
};

export default function Events() {
  return (
    <div>
      <HeroBanner />
      <main className="wrapper">
        <PageNav />
        <h2 className="section-heading">Events</h2>
        <EventsGrid />
      </main>
    </div>
  );
}
