"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import { isAuthPath, withReturnTo } from "@/lib/auth/returnTo";
import { RETURN_TO_PARAM } from "@/src/constants/auth";

export const SignInCta = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.toString();
  const returnTo = isAuthPath(pathname)
    ? searchParams.get(RETURN_TO_PARAM)
    : `${pathname}${query ? `?${query}` : ""}`;

  return <Cta href={withReturnTo("/sign-in", returnTo)}>Sign in</Cta>;
};
