import { z } from "zod";
import { UserRole } from "@prisma/client";

export const UserDtoSchema = z.object({
  sub: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
});

export type UserDto = z.infer<typeof UserDtoSchema>;
