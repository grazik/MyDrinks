import { Metadata } from "next";
import { getEventBySlug, getEventWithDrinksBySlug } from "@/db/getEvent";
import { notFound } from "next/navigation";
import { ContentBand } from "@/src/components/atoms/ContentBand/ContentBand";
import { BackButton } from "@/src/components/atoms/BackButton/BackButton";

import "./event-page.scss";
import { EventPageHeader } from "@/src/components/organisms/EventPageHeader/EventPageHeader";
import { EventDrinksSection } from "@/src/components/organisms/EventDrinksSection/EventDrinksSection";

interface DrinkPageProps {
  params: Promise<{ event: string }>;
}

export async function generateMetadata({
  params,
}: Pick<DrinkPageProps, "params">): Promise<Metadata> {
  const { event: eventSlug } = await params;

  const event = await getEventBySlug(eventSlug);

  return {
    title: event?.title,
  };
}

export default async function EventPage({ params }: DrinkPageProps) {
  const { event: eventSlug } = await params;

  const event = await getEventWithDrinksBySlug(eventSlug);

  if (!event) {
    notFound();
  }

  const drinks = event.eventDrink.map(({ drink }) => drink);

  return (
    <>
      <ContentBand>
        <BackButton label={"Back"} />
      </ContentBand>
      <div className="event-page">
        <EventPageHeader
          title={event.title}
          image={event.image}
          description={event.description}
        />
        <div className="event-page__content">
          <EventDrinksSection drinks={drinks} />
        </div>
      </div>
    </>
  );
}
