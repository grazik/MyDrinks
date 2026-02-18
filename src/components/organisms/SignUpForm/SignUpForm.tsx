"use client";

import { TextField } from "@/src/components/atoms/TextField/TextField";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import "./sign-up-form.scss";
import { useForm } from "@/src/hooks/useForm";
import { SignUpSchema } from "@/lib/validation/auth";
import { createUser } from "@/src/actions/createUser";

export const SignUpForm = () => {
  const { onChange, errors, onBlur, handleSubmit } = useForm({
    schema: SignUpSchema,
    onSubmit: createUser,
  });

  return (
    <form
      className="sign-up-form"
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={handleSubmit}
    >
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
        id={"password"}
        placeholder={"*******"}
        errors={errors.password}
      />
      <TextField
        name={"confirm_password"}
        label={"Confirm Password"}
        id={"confirm_password"}
        placeholder={"*******"}
        errors={errors.confirm_password}
      />
      <Cta onClick={() => {}}>Create Account</Cta>
    </form>
  );
};
