import Link from "next/link";
import { SignUpForm } from "@/src/components/organisms/SignUpForm/SignUpForm";
import { getSafeReturnTo, withReturnTo } from "@/lib/validation/returnTo";
import { AUTH_ROUTES, RETURN_TO_PARAM } from "@/src/constants/auth";

import "./page.scss";

interface SignUpPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const returnTo = getSafeReturnTo((await searchParams)[RETURN_TO_PARAM]);

  return (
    <main className="wrapper sign-up-page">
      <h1 className="main-heading">JOIN MY DRINKS</h1>
      <p className="body-text text-center">
        Create an account to save and organize your favorite cocktails
      </p>
      <SignUpForm returnTo={returnTo} />
      <p className="body-text">
        Already have an account?{" "}
        <Link
          href={withReturnTo(AUTH_ROUTES.signIn, returnTo)}
          className="body-text sign-up-page__link"
        >
          Sign In
        </Link>
      </p>
    </main>
  );
}
