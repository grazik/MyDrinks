import bcrypt from "bcrypt";

const BCRYPT_SALT_ROUNDS = 12;
const DUMMY_HASH = "$2a$12$invalidhashvaluethatwillnevermatchwhatsoever";

export const createPasswordHash = (password: string) =>
  bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

export const comparePasswordHash = (password: string, hash = DUMMY_HASH) =>
  bcrypt.compare(password, hash);
