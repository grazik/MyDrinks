import { z, ZodSchema } from "zod";

export function getFieldsMap<T extends ZodSchema>(
  schema: T,
  defaultValue: boolean = false,
): Record<keyof z.infer<T>, boolean> {
  if (schema instanceof z.ZodObject) {
    const fields = Object.keys(schema.shape);
    return Object.fromEntries(
      fields.map((field) => [field, defaultValue]),
    ) as Record<keyof z.infer<T>, boolean>;
  }
  return {} as Record<keyof z.infer<T>, boolean>;
}
