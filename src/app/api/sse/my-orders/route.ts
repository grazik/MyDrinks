import { getUserDto } from "@/lib/auth/getUserDto";
import { ORDERS_CUSTOMER_CHANNEL } from "@/lib/realtime/channels";
import { subscribeToBarUpdates } from "@/lib/sse/emitter";
import { ensurePgListener } from "@/lib/sse/pgListener";
import { getActiveEventWithDrinkIds } from "@/db/getEvent";
import { getUserOrdersForEvent } from "@/db/getOrders";
import { encodeSseEvent, safeEnqueue, startHeartbeat } from "@/src/utils/sse";
import { BarEvent, BarUpdate, NotifyEvent } from "@/lib/sse/types";
import {
  OrderWithDrink,
  OrderWithDrinkWithIngredientsAndUser,
} from "@/src/types/order.types";

const toCustomerOrder = ({
  user,
  ...order
}: OrderWithDrinkWithIngredientsAndUser): OrderWithDrink => order;

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

  let activeEvent = await getActiveEventWithDrinkIds();

  const stream = new ReadableStream({
    async start(controller) {
      const { enqueue, markClosed } = safeEnqueue(controller);

      const stopHeartbeat = startHeartbeat(enqueue, () => teardown());

      const unsubscribeOrderEmitter = subscribeToBarUpdates(
        ORDERS_CUSTOMER_CHANNEL,
        async (update: BarUpdate) => {
          if (update.type === NotifyEvent.BAR_OPENED) {
            console.log(
              `[SSE MyOrders] ${new Date().toISOString()} BAR OPENED | new active event id: ${update.event.id} title: ${update.event.title}`,
            );
            activeEvent = update.event;
            enqueue(encodeSseEvent(BarEvent.BAR_OPENED, update.event));
            const allOrders = await getUserOrdersForEvent(
              user.sub,
              activeEvent.id,
            );

            console.log(
              `[SSE MyOrders] ${new Date().toISOString()} Active event present | id: ${user.sub}.`,
            );
            enqueue(encodeSseEvent(BarEvent.USER_ALL_ORDERS, allOrders));
            return;
          }

          if (update.type === NotifyEvent.BAR_CLOSED) {
            console.log(
              `[SSE MyOrders] ${new Date().toISOString()} BAR CLOSED | active event -> null`,
            );
            activeEvent = null;
            enqueue(encodeSseEvent(BarEvent.BAR_CLOSED, null));
            return;
          }

          const { order } = update;

          // The customer channel is a broadcast: every connection receives every
          // customer's orders, so without this guard a customer sees others'.
          if (order.userId !== user.sub) return;

          console.log(
            `[SSE MyOrders] ${new Date().toISOString()} incoming new event | id: ${user.sub}, order: ${order.id}.`,
          );

          if (
            activeEvent?.eventDrink.find(
              ({ drinkId }) => drinkId === order.drinkId,
            )
          ) {
            console.log(
              `[SSE MyOrders] ${new Date().toISOString()} Order found | id: ${user.sub}, order: ${order.id}, eventId: ${activeEvent?.id}.`,
            );
            enqueue(
              encodeSseEvent(
                BarEvent.USER_ORDER_UPDATED,
                toCustomerOrder(order),
              ),
            );
          } else {
            console.log(
              `[SSE MyOrders] ${new Date().toISOString()} Order not part of active event | id: ${user.sub}, order: ${order.id}, eventId: ${activeEvent?.id}.`,
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
