"use client";

import { TextField } from "@/src/components/atoms/TextField/TextField";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import "./sign-up-form.scss";

export const SignUpForm = () => {
  return (
    <form className="sign-up-form">
      <TextField
        name={"name"}
        label={"Full name"}
        id={"name"}
        placeholder="Johe Doe"
      />
      <TextField
        name={"email"}
        label={"Email"}
        id={"email"}
        placeholder="your@email.com"
      />
      <TextField
        name={"password"}
        label={"password"}
        id={"password"}
        placeholder={"*******"}
      />
      <TextField
        name={"confirm_password"}
        label={"Confirm Password"}
        id={"confirm_password"}
        placeholder={"*******"}
      />
      <Cta onClick={() => console.log("ASDAS")}>Create Account</Cta>
    </form>
  );
};
