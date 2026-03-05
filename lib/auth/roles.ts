import { UserRole } from "@prisma/client";

export const isStaff = (role: UserRole | undefined): boolean =>
  role === UserRole.BARTENDER || role === UserRole.ADMIN;
