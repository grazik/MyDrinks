import { verifyAuthToken } from "@/lib/auth/jwt";
import { UserDto, UserDtoSchema } from "@/lib/dto/user";
import { AUTH_COOKIE_NAME } from "@/src/constants/auth";
import { cookies } from "next/headers";
import { cache } from "react";

export const getUserDto = cache(async (): Promise<UserDto | null> => {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyAuthToken(token);

    const parsedPayload = UserDtoSchema.safeParse(payload);

    if (!parsedPayload.success) {
      return null;
    }

    return parsedPayload.data;
  } catch {
    return null;
  }
});
