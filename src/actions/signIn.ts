"use server";

import { normalizeEmail } from "@/lib/auth/email";
import { SignInSchema } from "@/lib/validation/auth";
import { comparePasswordHash } from "@/lib/auth/password";
import { prisma } from "@/db/db";
import { redirect } from "next/navigation";
import { AUTH_TOKEN_EXPIRES_IN_SECONDS, createAuthToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, AUTH_ERRORS } from "@/src/constants/auth";

export interface SignInResult {
  ok: boolean;
  message: string;
}

export const signIn = async (rawData: unknown): Promise<SignInResult> => {
  const parsedData = SignInSchema.safeParse(rawData);

  if (!parsedData.success) {
    return { ok: false, message: AUTH_ERRORS.invalidSignInData };
  }

  const { email, password } = parsedData.data;

  let user = null;

  try {
    user = await prisma.user.findUnique({
      where: { email: normalizeEmail(email) },
    });

    const passwordMatch = await comparePasswordHash(
      password,
      user?.passwordHash,
    );

    if (!user || !user.isActive || !passwordMatch) {
      return { ok: false, message: AUTH_ERRORS.invalidCredentials };
    }
  } catch {
    return { ok: false, message: AUTH_ERRORS.signInFailed };
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
