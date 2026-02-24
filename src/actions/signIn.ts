"use server";

import { normalizeEmail } from "@/lib/auth/email";
import { SignInSchema } from "@/lib/validation/auth";
import { comparePasswordHash } from "@/lib/auth/password";
import { prisma } from "@/db/db";
import { redirect } from "next/navigation";
import { AUTH_TOKEN_EXPIRES_IN_SECONDS, createAuthToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/src/constants/auth";

export interface SignInResult {
  ok: boolean;
  message: string;
}

export const signIn = async (rawData: unknown): Promise<SignInResult> => {
  let user = null;
  try {
    const { email, password } = SignInSchema.parse(rawData);

    user = await prisma.user.findUnique({
      where: { email: normalizeEmail(email) },
    });

    const passwordMatch = await comparePasswordHash(
      password,
      user?.passwordHash,
    );

    if (!user || !user.isActive || !passwordMatch) {
      return {
        ok: false,
        message: "Invalid email or password",
      };
    }
  } catch {
    return {
      ok: false,
      message: "Wrong data format",
    };
  }

  const token = await createAuthToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  (await cookies()).set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_TOKEN_EXPIRES_IN_SECONDS,
  });

  redirect("/");
};
