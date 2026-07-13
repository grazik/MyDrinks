import { BarEvent, BarEventPayloads } from "@/lib/sse/types";

const encoder = new TextEncoder();

export const encodeSseEvent = <T extends BarEvent>(
  type: T,
  data: BarEventPayloads[T],
): Uint8Array =>
  encoder.encode(
    `event: ${type || "message"}\ndata: ${JSON.stringify(data)}\n\n`,
  );

// JSON has no Date type, so `JSON.stringify` serializes Prisma `DateTime`
// fields to ISO strings. This reviver turns them back into real `Date`
// objects on parse, keeping SSE payloads shaped identically to the data
// Next.js hands to client components across the RSC boundary.
const DATE_KEYS = new Set(["createdAt", "updatedAt"]);

const dateReviver = (key: string, value: unknown) =>
  DATE_KEYS.has(key) && typeof value === "string" ? new Date(value) : value;

export const parseSseData = <T>(raw: string): T =>
  JSON.parse(raw, dateReviver) as T;
