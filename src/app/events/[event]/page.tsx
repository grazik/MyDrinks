import { Metadata } from "next";
import { getEventBySlug } from "@/db/getEvent";
import { getDrinkBySlug } from "@/db/getDrink";
import { notFound } from "next/navigation";

interface DrinkPageProps {
  params: Promise<{ event: string }>;
}

export async function generateMetadata({
  params,
}: Pick<DrinkPageProps, "params">): Promise<Metadata> {
  const { event: eventSlug } = await params;

  const event = await getEventBySlug(eventSlug);

  console.log(event, eventSlug);
  return {
    title: event?.title,
  };
}

export default async function EventPage({ params }: DrinkPageProps) {
  const { event: eventSlug } = await params;

  const event = await getEventBySlug(eventSlug);

  if (!event) {
    notFound();
  }

  return <div>dasdas</div>;
}
