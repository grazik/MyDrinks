import { parseAuthToken } from "@/lib/auth/jwt";
import { UserDto } from "@/lib/dto/user";
import { AUTH_COOKIE_NAME } from "@/src/constants/auth";
import { cookies } from "next/headers";
import { cache } from "react";

export const getUserDto = cache(async (): Promise<UserDto | null> => {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    return await parseAuthToken(token);
  } catch {
    return null;
  }
});
