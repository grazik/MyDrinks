"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import { isAuthPath, withReturnTo } from "@/lib/validation/returnTo";
import { AUTH_ROUTES, RETURN_TO_PARAM } from "@/src/constants/auth";

const SignInLink = ({ href }: { href: string }) => (
  <Cta href={href}>Sign in</Cta>
);

const SignInLinkWithReturnTo = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.toString();
  const currentPath = query ? `${pathname}?${query}` : pathname;

  // On /sign-in and /sign-up, pointing back at the form itself would discard
  // where the user originally came from, so pass that along instead.
  const returnTo = isAuthPath(pathname)
    ? searchParams.get(RETURN_TO_PARAM)
    : currentPath;

  return <SignInLink href={withReturnTo(AUTH_ROUTES.signIn, returnTo)} />;
};

export const SignInCta = () => (
  <Suspense fallback={<SignInLink href={AUTH_ROUTES.signIn} />}>
    <SignInLinkWithReturnTo />
  </Suspense>
);
