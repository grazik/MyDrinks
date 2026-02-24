import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Name must be at least 2 characters" }),
    email: z.email({ message: "Please enter a valid email address" }).trim(),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/^\S+$/, "Password must not contain whitespace"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export const SignInSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password must not be empty" }),
});
