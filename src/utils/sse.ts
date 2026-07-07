const encoder = new TextEncoder();

export const encodeSseEvent = (
  type: string,
  data: object | null,
): Uint8Array =>
  encoder.encode(`event: ${type || "message"}\ndata: ${JSON.stringify(data)}\n\n`);
