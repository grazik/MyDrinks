import { getActiveEvent } from "@/db/getEvent";
import { NoActiveEvent } from "@/src/app/dashboard/NoActiveEvent";
import { getAllOrdersForEvent } from "@/dal/orders";

import "./page.scss";
import { SelectedOrderProvider } from "@/src/contexts/SelectedOrderContext/SelectedOrderProvider";
import { DashboardClient } from "@/src/app/dashboard/DashboardClient";

export default async function DashboardPage() {
  const activeEvent = await getActiveEvent();

  if (!activeEvent) {
    return <NoActiveEvent />;
  }

  const orders = await getAllOrdersForEvent(activeEvent.id);

  return (
    <main className="dashboard">
      <div className="dashboard__content">
        <SelectedOrderProvider>
          <DashboardClient initialOrders={orders} />
        </SelectedOrderProvider>
      </div>
    </main>
  );
}
