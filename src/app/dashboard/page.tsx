import { H1Heading } from "@/src/components/atoms/SectionHeading/SectionHeading";
import { getActiveEvent } from "@/db/getEvent";

export default async function DashboardPage() {
  const activeEvent = getActiveEvent();
  return (
    <main className="wrapper">
      <H1Heading>Dashboard</H1Heading>
    </main>
  );
}
