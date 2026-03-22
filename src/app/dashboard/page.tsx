import { getActiveEvent } from "@/db/getEvent";
import { DashboardTabs } from "@/src/components/organisms/DashboardTabs/DashboardTabs";
import { NoActiveEvent } from "@/src/app/dashboard/NoActiveEvent";
import { getAllOrdersForEvent } from "@/dal/orders";
import { groupOrdersByTab } from "@/src/utils/orders/orders";
import { RecipePanel } from "@/src/components/organisms/RecipePanel/RecipePanel";

import "./page.scss";
import { SelectedOrderProvider } from "@/src/contexts/SelectedOrderContext/SelectedOrderProvider";

export default async function DashboardPage() {
  const activeEvent = await getActiveEvent();

  if (!activeEvent) {
    return <NoActiveEvent />;
  }

  const orders = await getAllOrdersForEvent(activeEvent.id);
  const groupedOrders = groupOrdersByTab(orders);

  return (
    <main>
      <div className="dashboard__content">
        <SelectedOrderProvider>
          <DashboardTabs groupedOrders={groupedOrders} />
          <RecipePanel />
        </SelectedOrderProvider>
      </div>
    </main>
  );
}
