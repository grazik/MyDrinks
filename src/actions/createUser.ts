"use server";

import { prisma } from "@/db/db";
import {
  AUTH_TOKEN_EXPIRES_IN_SECONDS,
  createAuthToken,
} from "@/lib/auth/jwt";
import { SignUpSchema } from "@/lib/validation/auth";
import { AUTH_COOKIE_NAME, AUTH_ERRORS } from "@/src/constants/auth";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BCRYPT_SALT_ROUNDS = 12;

export interface CreateUserResult {
  ok: boolean;
  message: string;
}

export const createUser = async (rawData: unknown): Promise<CreateUserResult> => {
  const parsedData = SignUpSchema.safeParse(rawData);

  if (!parsedData.success) {
    return {
      ok: false,
      message: AUTH_ERRORS.invalidSignUpData,
    };
  }

  const { name, email, password } = parsedData.data;
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true },
  });

  if (existingUser) {
    return {
      ok: false,
      message: AUTH_ERRORS.emailAlreadyInUse,
    };
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

  const createdUser = await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  const token = await createAuthToken({
    sub: createdUser.id,
    email: createdUser.email,
    role: createdUser.role,
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
