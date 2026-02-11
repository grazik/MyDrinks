import "./page.scss";
import { SignInForm } from "@/src/components/organisms/SignInForm/SignInForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="wrapper sign-in-page">
      <h1 className="main-heading">Welcome back</h1>
      <p className="body-text text-center">
        Sign in to save your favorite cocktails
      </p>
      <SignInForm />
      <p className="body-text">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="body-text sign-in-page__link">
          Sign up
        </Link>
      </p>
    </main>
  );
}
