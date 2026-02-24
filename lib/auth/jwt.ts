import { jwtVerify, SignJWT } from "jose";
import { AUTH_ERRORS } from "@/src/constants/auth";
import { UserDto } from "@/lib/dto/user";

const JWT_ALGORITHM = "HS256";
const AUTH_TOKEN_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7;

const getJwtSecret = () => {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error(AUTH_ERRORS.authSecretRequired);
  }

  return new TextEncoder().encode(secret);
};

export const createAuthToken = (
  payload: UserDto,
  expiresInSeconds = AUTH_TOKEN_EXPIRES_IN_SECONDS,
) => {
  return new SignJWT(payload)
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
