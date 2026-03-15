import { H1Heading } from "@/src/components/atoms/SectionHeading/SectionHeading";
import { getActiveEvent } from "@/db/getEvent";
import { DashboardTabs } from "@/src/components/organisms/DashboardTabs/DashboardTabs";
import { NoActiveEvent } from "@/src/app/dashboard/NoActiveEvent";
import { getAllOrdersForEvent } from "@/dal/orders";
import { groupOrdersByTab } from "@/src/utils/orders/orders";

export default async function DashboardPage() {
  const activeEvent = await getActiveEvent();

  if (!activeEvent) {
    return <NoActiveEvent />;
  }

  const orders = await getAllOrdersForEvent(activeEvent.id);
  const groupedOrders = groupOrdersByTab(orders);

  return (
    <main>
      <div className="wrapper page">
        <H1Heading>Dashboard</H1Heading>
      </div>

      <DashboardTabs groupedOrders={groupedOrders} />
    </main>
  );
}
