"use client";

import { TextField } from "@/src/components/atoms/TextField/TextField";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import "./sign-in-form.scss";

export const SignInForm = () => {
  return (
    <form className="sign-in-form">
      <TextField
        name={"email"}
        label={"Email"}
        type={"email"}
        id={"email"}
        required={true}
        placeholder="your@email.com"
      />
      <TextField
        type={"password"}
        name={"password"}
        label={"password"}
        id={"password"}
        placeholder={"Password"}
        required={true}
      />
      <Cta onClick={() => console.log("ASDAS")}>Sign In</Cta>
    </form>
  );
};
