"use client";

import { TextField } from "@/src/components/atoms/TextField/TextField";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import "./sign-in-form.scss";
import { useEffect, useState } from "react";
import { useForm } from "@/src/hooks/useForm";
import { SignInSchema } from "@/lib/validation/auth";
import { signIn } from "@/src/actions/signIn";
import { Banner } from "@/src/components/atoms/Banner/Banner";
import { Spinner } from "@/src/components/atoms/Spinner/Spinner";

export const SignInForm = () => {
  const [error, setError] = useState("");

  const onSubmit = async (data: unknown) => {
    const { ok, message } = await signIn(data);
    if (!ok) {
      setError(message);
    } else {
      setError("");
    }
  };

  const { onChange, errors, onBlur, handleSubmit, isPending } = useForm({
    schema: SignInSchema,
    onSubmit,
  });

  useEffect(() => {
    if (isPending) {
      setError("");
    }
  }, [isPending]);

  return (
    <form
      className="sign-in-form"
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={handleSubmit}
    >
      {error && (
        <Banner variant="danger">
          <p className={"error-text"}>{error}</p>
        </Banner>
      )}
      <TextField
        name={"email"}
        label={"Email"}
        type={"email"}
        id={"email"}
        required={true}
        placeholder="your@email.com"
        errors={errors.email}
      />
      <TextField
        type={"password"}
        name={"password"}
        label={"password"}
        id={"password"}
        placeholder={"Password"}
        required={true}
        errors={errors.password}
      />
      <Cta disabled={isPending}>{isPending && <Spinner />} Sign in</Cta>
    </form>
  );
};
