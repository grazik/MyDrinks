import { getUserDto } from "@/lib/auth/getUserDto";
import { isStaff } from "@/lib/auth/roles";
import { OrderEvent, ORDERS_BARTENDER_CHANNEL } from "@/lib/realtime/channels";
import { subscribeToOrderEmitter } from "@/lib/sse/emitter";
import { ensurePgListener } from "@/lib/sse/pgListener";
import { getActiveEventWithDrinkIds } from "@/db/getEvent";
import {
  getAllOrdersForEvent,
  getOrderByIdWithUserAndIngredients,
} from "@/db/getOrders";
import { encodeSseEvent, safeEnqueue, startHeartbeat } from "@/src/utils/sse";
import { BarEvent } from "@/lib/sse/types";

export async function GET() {
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
  let teardown = () => {};

  const activeEvent = await getActiveEventWithDrinkIds();

  const stream = new ReadableStream({
    async start(controller) {
      const { enqueue, markClosed } = safeEnqueue(controller);

      const stopHeartbeat = startHeartbeat(enqueue, () => teardown());

      const unsubscribeOrderEmitter = subscribeToOrderEmitter(
        ORDERS_BARTENDER_CHANNEL,
        async (payload: OrderEvent) => {
          console.log(
            `[SSE Dashboard] ${new Date().toISOString()} incoming new event | id: ${user.sub}, order: ${payload.orderId}.`,
          );

          const order = await getOrderByIdWithUserAndIngredients(
            payload.orderId,
          );

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
            enqueue(encodeSseEvent(BarEvent.ORDER_UPDATED, order));
          } else {
            console.log(
              `[SSE Dashboard] ${new Date().toISOString()} Order not part of active event | id: ${user.sub}, order: ${payload.orderId}, eventId: ${activeEvent?.id}.`,
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
        const allOrders = await getAllOrdersForEvent(activeEvent.id);

        console.log(
          `[SSE Dashboard] ${new Date().toISOString()} Active event present | id: ${user.sub}.`,
        );
        enqueue(encodeSseEvent(BarEvent.ALL_ORDERS, allOrders));
      } else {
        console.log(
          `[SSE Dashboard] ${new Date().toISOString()} No active event | id: ${user.sub}.`,
        );
        enqueue(encodeSseEvent(BarEvent.BAR_CLOSED, null));
      }
    },
    cancel() {
      teardown();
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
