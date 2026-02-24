"use server";

import { prisma } from "@/db/db";
import { AUTH_TOKEN_EXPIRES_IN_SECONDS, createAuthToken } from "@/lib/auth/jwt";
import { createPasswordHash } from "@/lib/auth/password";
import { SignUpSchema } from "@/lib/validation/auth";
import { normalizeEmail } from "@/lib/auth/email";
import { AUTH_COOKIE_NAME, AUTH_ERRORS } from "@/src/constants/auth";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface CreateUserResult {
  ok: boolean;
  message: string;
}

export const createUser = async (
  rawData: unknown,
): Promise<CreateUserResult> => {
  const parsedData = SignUpSchema.safeParse(rawData);

  if (!parsedData.success) {
    return {
      ok: false,
      message: AUTH_ERRORS.invalidSignUpData,
    };
  }

  const { name, email, password } = parsedData.data;
  const normalizedEmail = normalizeEmail(email);

  let token: string;

  try {
    const passwordHash = await createPasswordHash(password);

    const createdUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
      },
      select: { id: true, email: true, role: true },
    });

    token = await createAuthToken({
      sub: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { ok: false, message: AUTH_ERRORS.emailAlreadyInUse };
    }

    return { ok: false, message: AUTH_ERRORS.createUserFailed };
  }

  (await cookies()).set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_TOKEN_EXPIRES_IN_SECONDS,
  });

  redirect("/");
};
