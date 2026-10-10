-- Resolve open orders when an event is completed
-- -----------------------------------------------------------------------------
-- The bartender dashboard and /orders only show the ACTIVE event, so once an
-- event closes, its unfinished orders would sit in PENDING/MIXING/READY forever
-- with no UI able to move them. Events are switched via Prisma Studio and seed
-- scripts, which bypass app code, so this has to live in the database.
--
--   PENDING, MIXING → CANCELLED  (the guest won't get it once the bar is closed)
--   READY           → COMPLETED  (the drink was made and is at the pass)
--
-- Only a transition INTO 'COMPLETED' fires this. Moving an event back to
-- UPCOMING/DRAFT (e.g. an accidental deactivation) leaves its orders untouched,
-- because cancellation can't be undone.
--
-- No per-order pg_notify is sent: bar_status_trigger.sql already broadcasts
-- bar_closed for the same UPDATE, which clears active orders on every client.
--
-- "updatedAt" is set explicitly because @updatedAt is maintained by Prisma
-- Client, not the database.
--
-- Prisma does NOT manage triggers, and `prisma db push` does not run SQL files,
-- so this must be applied manually (and re-applied if the Event table is
-- recreated). It is idempotent, so it is safe to run repeatedly:
--
--   npx prisma db execute --file prisma/sql/resolve_orders_on_event_complete.sql --schema prisma/schema.prisma
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION resolve_orders_on_event_complete() RETURNS trigger AS $$
BEGIN
  UPDATE "Order"
     SET status = CASE status
                    WHEN 'READY' THEN 'COMPLETED'::"OrderStatus"
                    ELSE 'CANCELLED'::"OrderStatus"
                  END,
         "updatedAt" = now()
   WHERE "eventId" = NEW.id
     AND status IN ('PENDING', 'MIXING', 'READY');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS event_complete_resolve_orders ON "Event";
CREATE TRIGGER event_complete_resolve_orders
  AFTER UPDATE OF status ON "Event"
  FOR EACH ROW
  WHEN (NEW.status = 'COMPLETED' AND OLD.status IS DISTINCT FROM 'COMPLETED')
  EXECUTE FUNCTION resolve_orders_on_event_complete();
