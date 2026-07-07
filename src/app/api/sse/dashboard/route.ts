import { getUserDto } from "@/lib/auth/getUserDto";
import { isStaff } from "@/lib/auth/roles";
import { OrderEvent, ORDERS_BARTENDER_CHANNEL } from "@/lib/realtime/channels";
import { orderEmitter } from "@/lib/sse/emitter";
import { ensurePgListener } from "@/lib/sse/pgListener";
import { getActiveEventWithDrinkIds } from "@/db/getEvent";
import { getAllOrdersForEvent, getOrderById } from "@/db/getOrders";
import { encodeSseEvent } from "@/src/utils/sse";

export async function GET() {
  const encoder = new TextEncoder();
  const user = await getUserDto();

  if (!user) {
    console.log(
      `[SSE Dashboard] ${new Date().toISOString()} Connection refused | user not logged in`,
    );
    return new Response("Unauthorized", {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!isStaff(user.role)) {
    console.log(
      `[SSE Dashboard] ${new Date().toISOString()} Connection refused | user unauthorized. id: ${user.sub}`,
    );
    return new Response("Forbidden", {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  await ensurePgListener();

  const activeEvent = await getActiveEventWithDrinkIds();

  const stream = new ReadableStream({
    async start(controller) {
      orderEmitter.on(ORDERS_BARTENDER_CHANNEL, async (payload: OrderEvent) => {
        console.log(
          `[SSE Dashboard] ${new Date().toISOString()} incoming new event | id: ${user.sub}, order: ${payload.orderId}.`,
        );

        const order = await getOrderById(payload.orderId);

        if (!order) {
          console.log(
            `[SSE Dashboard] ${new Date().toISOString()} Order not found | id: ${user.sub}, order: ${payload.orderId}.`,
          );
        } else if (
          activeEvent?.eventDrink.find(
            ({ drinkId }) => drinkId === order.drinkId,
          )
        ) {
          console.log(
            `[SSE Dashboard] ${new Date().toISOString()} Order found | id: ${user.sub}, order: ${payload.orderId}, eventId: ${activeEvent?.id}.`,
          );
          controller.enqueue(encodeSseEvent("order_updated", order));
        } else {
          console.log(
            `[SSE Dashboard] ${new Date().toISOString()} Order not part of active event | id: ${user.sub}, order: ${payload.orderId}, eventId: ${activeEvent?.id}.`,
          );
        }
      });

      if (activeEvent) {
        const allOrders = await getAllOrdersForEvent(activeEvent.id);

        console.log(
          `[SSE Dashboard] ${new Date().toISOString()} Active event present | id: ${user.sub}.`,
        );
        controller.enqueue(encodeSseEvent("all_orders", allOrders));
      } else {
        console.log(
          `[SSE Dashboard] ${new Date().toISOString()} No active event | id: ${user.sub}.`,
        );
        controller.enqueue(encodeSseEvent("bar_closed", null));
      }
    },
  });

  console.log(
    `[SSE Dashboard] ${new Date().toISOString()} Connection established | id: ${user.sub}.`,
  );

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
