import z from "zod";

export const orderDtoSchema = z.object({
  quantity: z.number().min(1).max(5),
  drinkId: z.uuid(),
});
