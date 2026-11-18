import "./page.scss";
import { SignInForm } from "@/src/components/organisms/SignInForm/SignInForm";
import Link from "next/link";
import { getSafeReturnTo, withReturnTo } from "@/lib/validation/returnTo";
import { AUTH_ROUTES, RETURN_TO_PARAM } from "@/src/constants/auth";

interface SignInPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const returnTo = getSafeReturnTo((await searchParams)[RETURN_TO_PARAM]);

  return (
    <main className="wrapper sign-in-page">
      <h1 className="main-heading">Welcome back</h1>
      <p className="body-text text-center">
        Sign in to save your favorite cocktails
      </p>
      <SignInForm returnTo={returnTo} />
      <p className="body-text">
        Don&apos;t have an account?{" "}
        <Link
          href={withReturnTo(AUTH_ROUTES.signUp, returnTo)}
          className="body-text sign-in-page__link"
        >
          Sign up
        </Link>
      </p>
    </main>
  );
}
