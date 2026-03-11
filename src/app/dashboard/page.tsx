import { H1Heading } from "@/src/components/atoms/SectionHeading/SectionHeading";
import { getActiveEvent } from "@/db/getEvent";
import { DashboardTabs } from "@/src/components/organisms/DashboardTabs/DashboardTabs";
import {
  HistoryStatusScreen,
  MixingStatusScreen,
  PendingStatusScreen,
  ReadyStatusScreen,
} from "@/src/components/organisms/DashboardStatusScreens";

export default async function DashboardPage() {
  const activeEvent = getActiveEvent();
  return (
    <main className="wrapper">
      <H1Heading>Dashboard</H1Heading>

      <DashboardTabs
        tabs={{
          pendingTab: <PendingStatusScreen />,
          mixingTab: <MixingStatusScreen />,
          readyTab: <ReadyStatusScreen />,
          historyTab: <HistoryStatusScreen />,
        }}
      />
    </main>
  );
}
