import bcrypt from "bcrypt";

const BCRYPT_SALT_ROUNDS = 12;

export const createPasswordHash = (password: string) =>
  bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
