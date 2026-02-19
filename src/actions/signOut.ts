"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/src/constants/auth";

export const signOut = async () => {
  (await cookies()).delete(AUTH_COOKIE_NAME);

  redirect("/");
};

