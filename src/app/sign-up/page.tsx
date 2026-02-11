import Link from "next/link";
import { SignUpForm } from "@/src/components/organisms/SignUpForm/SignUpForm";

import "./page.scss";

export default function SignUpPage() {
  return (
    <main className="wrapper sign-up-page">
      <h1 className="main-heading">JOIN MY DRINKS</h1>
      <p className="body-text text-center">
        Create an account to save and organize your favorite cocktails
      </p>
      <SignUpForm />
      <p className="body-text">
        Already have an account?{" "}
        <Link href="/sign-in" className="body-text sign-up-page__link">
          Sign In
        </Link>
      </p>
    </main>
  );
}
