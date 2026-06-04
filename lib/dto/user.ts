import { z } from "zod";
import { UserRole } from "@prisma/client";

export const UserDtoSchema = z.object({
  sub: z.string(),
  email: z.email(),
  role: z.enum(UserRole),
});

export type UserDto = z.infer<typeof UserDtoSchema>;
