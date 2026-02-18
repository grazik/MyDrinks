import { jwtVerify, SignJWT, type JWTPayload } from "jose";
import { AUTH_ERRORS } from "@/src/constants/auth";

const JWT_ALGORITHM = "HS256";
const AUTH_TOKEN_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7;

export type AuthTokenPayload = JWTPayload & {
  sub: string;
  email: string;
  role: string;
};

const getJwtSecret = () => {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error(AUTH_ERRORS.authSecretRequired);
  }

  return new TextEncoder().encode(secret);
};

export const createAuthToken = async (
  payload: AuthTokenPayload,
  expiresInSeconds = AUTH_TOKEN_EXPIRES_IN_SECONDS,
) => {
  const jwtPayload: JWTPayload = payload;

  return new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: JWT_ALGORITHM, typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(`${expiresInSeconds}s`)
    .sign(getJwtSecret());
};

export const verifyAuthToken = async (token: string) => {
  const { payload } = await jwtVerify(token, getJwtSecret(), {
    algorithms: [JWT_ALGORITHM],
  });

  return payload;
};

export { AUTH_TOKEN_EXPIRES_IN_SECONDS };
