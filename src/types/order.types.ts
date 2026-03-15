import { Prisma } from "@prisma/client";

export type OrderWithDrink = Prisma.OrderGetPayload<{ include: { drink: true } }>;