export const AUTH_COOKIE_NAME = "auth_token";

export const AUTH_ERRORS = {
  invalidSignUpData: "Invalid sign up data",
  emailAlreadyInUse: "Email is already in use",
  authSecretRequired: "AUTH_SECRET is required",
  createUserFailed: "Error creating user",
  invalidSignInData: "Invalid sign in data",
  invalidCredentials: "Invalid email or password",
  signInFailed: "Error signing in",
} as const;
