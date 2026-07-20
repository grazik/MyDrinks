import { getUserDto } from "@/lib/auth/getUserDto";
import { OrderEvent, ORDERS_CUSTOMER_CHANNEL } from "@/lib/realtime/channels";
import { subscribeToOrderEmitter } from "@/lib/sse/emitter";
import { ensurePgListener } from "@/lib/sse/pgListener";
import { getActiveEventWithDrinkIds } from "@/db/getEvent";
import { getUserOrderById, getUserOrdersForEvent } from "@/db/getOrders";
import { encodeSseEvent, safeEnqueue, startHeartbeat } from "@/src/utils/sse";
import { BarEvent } from "@/lib/sse/types";

export async function GET() {
  const user = await getUserDto();

  if (!user) {
    console.log(
      `[SSE MyOrders] ${new Date().toISOString()} Connection refused | user not logged in`,
    );
    return new Response("Unauthorized", {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  await ensurePgListener();
  let teardown = () => {};

  const activeEvent = await getActiveEventWithDrinkIds();

  const stream = new ReadableStream({
    async start(controller) {
      const { enqueue, markClosed } = safeEnqueue(controller);

      const stopHeartbeat = startHeartbeat(enqueue, () => teardown());

      const unsubscribeOrderEmitter = subscribeToOrderEmitter(
        ORDERS_CUSTOMER_CHANNEL,
        async (payload: OrderEvent) => {
          console.log(
            `[SSE MyOrders] ${new Date().toISOString()} incoming new event | id: ${user.sub}, order: ${payload.orderId}.`,
          );

          const order = await getUserOrderById(user.sub, payload.orderId);

          if (!order) {
            console.log(
              `[SSE MyOrders] ${new Date().toISOString()} Order not found | id: ${user.sub}, order: ${payload.orderId}.`,
            );

            return;
          }

          if (
            activeEvent?.eventDrink.find(
              ({ drinkId }) => drinkId === order.drinkId,
            )
          ) {
            console.log(
              `[SSE MyOrders] ${new Date().toISOString()} Order found | id: ${user.sub}, order: ${payload.orderId}, eventId: ${activeEvent?.id}.`,
            );
            enqueue(encodeSseEvent(BarEvent.USER_ORDER_UPDATED, order));
          } else {
            console.log(
              `[SSE MyOrders] ${new Date().toISOString()} Order not part of active event | id: ${user.sub}, order: ${payload.orderId}, eventId: ${activeEvent?.id}.`,
            );
          }
        },
      );

      // Single idempotent teardown both paths converge on: the stream's
      // `cancel` (graceful disconnect) and a failed heartbeat (half-open).
      teardown = () => {
        stopHeartbeat();
        unsubscribeOrderEmitter();
        markClosed();
      };

      if (activeEvent) {
        const allOrders = await getUserOrdersForEvent(user.sub, activeEvent.id);

        console.log(
          `[SSE MyOrders] ${new Date().toISOString()} Active event present | id: ${user.sub}.`,
        );
        enqueue(encodeSseEvent(BarEvent.USER_ALL_ORDERS, allOrders));
      } else {
        console.log(
          `[SSE MyOrders] ${new Date().toISOString()} No active event | id: ${user.sub}.`,
        );
        enqueue(encodeSseEvent(BarEvent.BAR_CLOSED, null));
      }
    },
    cancel() {
      teardown();
    },
  });

  console.log(
    `[SSE MyOrders] ${new Date().toISOString()} Connection established | id: ${user.sub}.`,
  );

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
