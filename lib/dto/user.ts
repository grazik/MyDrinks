import { z } from "zod";

export const UserDtoSchema = z.object({
  sub: z.string(),
  email: z.string().email(),
  role: z.string(),
});

export type UserDto = z.infer<typeof UserDtoSchema>;
