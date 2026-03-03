import { getActiveEvent } from "@/db/getEvent";
import { ActiveOrdersSection } from "@/src/app/orders/ActiveOrdersSection";

export default async function OrdersPage() {
  const activeEvent = await getActiveEvent();

  return (
    <main className="wrapper">
      <h1>Orders</h1>
      <ActiveOrdersSection event={activeEvent} />
    </main>
  );
}
