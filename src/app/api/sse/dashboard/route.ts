import { getUserDto } from "@/lib/auth/getUserDto";
import { isStaff } from "@/lib/auth/roles";
import { ORDERS_BARTENDER_CHANNEL } from "@/lib/realtime/channels";
import { subscribeToBarUpdates } from "@/lib/sse/emitter";
import { ensurePgListener } from "@/lib/sse/pgListener";
import { getActiveEventWithDrinkIds } from "@/db/getEvent";
import { getAllOrdersForEvent } from "@/db/getOrders";
import { encodeSseEvent, safeEnqueue, startHeartbeat } from "@/src/utils/sse";
import { BarEvent, BarUpdate, NotifyEvent, toEventView } from "@/lib/sse/types";

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

  let activeEvent = await getActiveEventWithDrinkIds();

  const stream = new ReadableStream({
    async start(controller) {
      const { enqueue, markClosed } = safeEnqueue(controller);

      const stopHeartbeat = startHeartbeat(enqueue, () => teardown());

      // Erroring the stream is the recovery path: EventSource reconnects on
      // its own and the reconnect GET re-sends a full snapshot, so a failed
      // update must fail the stream rather than leave the client out of sync.
      const fail = (err: unknown) => {
        console.error(
          `[SSE Dashboard] ${new Date().toISOString()} stream failed; client will reconnect | id: ${user.sub}`,
          err,
        );
        teardown();
        controller.error(err);
      };

      const unsubscribeOrderEmitter = subscribeToBarUpdates(
        ORDERS_BARTENDER_CHANNEL,
        async (update: BarUpdate) => {
          if (update.type === NotifyEvent.BAR_OPENED) {
            console.log(
              `[SSE Dashboard] ${new Date().toISOString()} BAR OPENED | new active event id: ${update.event.id} title: ${update.event.title}`,
            );
            activeEvent = update.event;
            enqueue(encodeSseEvent(BarEvent.BAR_OPENED, toEventView(update.event)));

            const allOrders = await getAllOrdersForEvent(activeEvent.id);
            enqueue(encodeSseEvent(BarEvent.ALL_ORDERS, allOrders));
            return;
          }

          if (update.type === NotifyEvent.BAR_CLOSED) {
            console.log(
              `[SSE Dashboard] ${new Date().toISOString()} BAR CLOSED | active event -> null`,
            );
            activeEvent = null;
            enqueue(encodeSseEvent(BarEvent.BAR_CLOSED, null));
            return;
          }

          const { order } = update;

          console.log(
            `[SSE Dashboard] ${new Date().toISOString()} incoming new order | id: ${user.sub}, order: ${order.id}.`,
          );

          if (
            activeEvent?.eventDrink.find(
              ({ drinkId }) => drinkId === order.drinkId,
            )
          ) {
            console.log(
              `[SSE Dashboard] ${new Date().toISOString()} Order found | id: ${user.sub}, order: ${order.id}, eventId: ${activeEvent?.id}.`,
            );
            enqueue(encodeSseEvent(BarEvent.ORDER_UPDATED, order));
          } else {
            console.log(
              `[SSE Dashboard] ${new Date().toISOString()} Order not part of active event | id: ${user.sub}, order: ${order.id}, eventId: ${activeEvent?.id}.`,
            );
          }
        },
        fail,
      );

      // Single idempotent teardown both paths converge on: the stream's
      // `cancel` (graceful disconnect) and a failed heartbeat (half-open).
      teardown = () => {
        stopHeartbeat();
        unsubscribeOrderEmitter();
        markClosed();
      };

      // A rejection escaping start() would error the stream without running
      // teardown, leaking the heartbeat interval and emitter subscription.
      try {
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
      } catch (err) {
        fail(err);
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
