"use server";

import { SignInSchema } from "@/lib/validation/auth";
import { createPasswordHash } from "@/lib/auth/password";

export interface SignInResult {
  ok: boolean;
  message: string;
}

export const signIn = async (rawData: unknown) => {
  try {
    const { email, password } = SignInSchema.parse(rawData);

    const passwordHash = await createPasswordHash(password);
  } catch {
    return {
      ok: false,
      message: "Wrong data format",
    };
  }
};
