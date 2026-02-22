"use client";

import { TextField } from "@/src/components/atoms/TextField/TextField";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import "./sign-up-form.scss";
import { useForm } from "@/src/hooks/useForm";
import { SignUpSchema } from "@/lib/validation/auth";
import { createUser } from "@/src/actions/createUser";
import { Banner } from "@/src/components/atoms/Banner/Banner";
import { useEffect, useState } from "react";
import { Spinner } from "@/src/components/atoms/Spinner/Spinner";

export const SignUpForm = () => {
  const [error, setError] = useState("");

  const onSubmit = async (data: unknown) => {
    const { ok, message } = await createUser(data);
    if (!ok) {
      setError(message);
    } else {
      setError("");
    }
  };

  const { onChange, errors, onBlur, handleSubmit, isPending } = useForm({
    schema: SignUpSchema,
    onSubmit,
  });

  useEffect(() => {
    if (isPending) {
      setError("");
    }
  }, [isPending]);

  return (
    <form
      className="sign-up-form"
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
        name={"name"}
        label={"Full name"}
        id={"name"}
        placeholder="Johe Doe"
        errors={errors.name}
      />
      <TextField
        name={"email"}
        label={"Email"}
        id={"email"}
        placeholder="your@email.com"
        errors={errors.email}
      />
      <TextField
        name={"password"}
        label={"password"}
        type={"password"}
        id={"password"}
        autoComplete={"off"}
        placeholder={"*******"}
        errors={errors.password}
      />
      <TextField
        name={"confirm_password"}
        label={"Confirm Password"}
        type={"password"}
        id={"confirm_password"}
        autoComplete={"off"}
        placeholder={"*******"}
        errors={errors.confirm_password}
      />
      <Cta disabled={isPending}>{isPending && <Spinner />} Create Account</Cta>
    </form>
  );
};
