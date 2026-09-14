-- Bar open/close NOTIFY trigger
-- -----------------------------------------------------------------------------
-- Prisma-managed schema uses APP-LEVEL pg_notify (see db/notify.ts), which only
-- fires when the mutation runs through our code. Event activation is done via
-- Prisma Studio, which writes straight to the DB and bypasses that path — so a
-- database-level trigger is the only way to broadcast bar open/close on those
-- out-of-band edits.
--
-- Prisma does NOT manage triggers, and `prisma db push` does not run SQL files,
-- so this must be applied manually and re-applied if the Event table is
-- recreated. It is written idempotently (CREATE OR REPLACE + DROP IF EXISTS),
-- so it is safe to run repeatedly (reads DATABASE_URL from .env, no psql needed):
--
--   npx prisma db execute --file prisma/sql/bar_status_trigger.sql --schema prisma/schema.prisma
--
-- Payload shape matches NotifyPayload in lib/sse/types.ts: { notifyType, data }.
-- The `notifyType` strings below must stay in sync with the NotifyEvent enum
-- (add BAR_OPENED = "bar_opened" and BAR_CLOSED = "bar_closed" there). Payloads
-- stay lean (just eventId) — the pg listener re-fetches the active event, so we
-- never risk the ~8KB pg_notify limit.
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION notify_bar_status() RETURNS trigger AS $$
DECLARE
  opened boolean := false;
  closed boolean := false;
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- A brand-new event created directly in the ACTIVE state opens the bar.
    opened := NEW.status = 'ACTIVE';
  ELSIF TG_OP = 'UPDATE' THEN
    opened := NEW.status = 'ACTIVE' AND OLD.status IS DISTINCT FROM 'ACTIVE';
    closed := OLD.status = 'ACTIVE' AND NEW.status IS DISTINCT FROM 'ACTIVE';
  END IF;

  IF opened THEN
    PERFORM pg_notify(
      'orders_customer',
      json_build_object('notifyType', 'bar_opened',
                        'data', json_build_object('eventId', NEW.id))::text
    );
    PERFORM pg_notify(
      'orders_bartender',
      json_build_object('notifyType', 'bar_opened',
                        'data', json_build_object('eventId', NEW.id))::text
    );
  ELSIF closed THEN
    PERFORM pg_notify(
      'orders_customer',
      json_build_object('notifyType', 'bar_closed',
                        'data', json_build_object('eventId', NEW.id))::text
    );
    PERFORM pg_notify(
      'orders_bartender',
      json_build_object('notifyType', 'bar_closed',
                        'data', json_build_object('eventId', NEW.id))::text
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- `UPDATE OF status` narrows the trigger to writes that touch the status column;
-- the INSERT arm covers events created directly in an ACTIVE state.
DROP TRIGGER IF EXISTS event_status_notify ON "Event";
CREATE TRIGGER event_status_notify
  AFTER INSERT OR UPDATE OF status ON "Event"
  FOR EACH ROW EXECUTE FUNCTION notify_bar_status();
