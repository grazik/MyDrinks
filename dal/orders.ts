import { cache } from "react";
import { redirect } from "next/navigation";
import { getUserDto } from "@/lib/auth/getUserDto";
import { isStaff } from "@/lib/auth/roles";
import { AUTH_ROUTES } from "@/src/constants/auth";
import {
  getUserOrdersForEvent,
  getAllOrdersForEvent as _getAllOrdersForEvent,
} from "@/db/getOrders";

export const getMyOrdersForEvent = cache(async (eventId: string) => {
  const userDto = await getUserDto();
  if (!userDto) redirect(AUTH_ROUTES.signIn);
  return getUserOrdersForEvent(userDto.sub, eventId);
});

export const getAllOrdersForEvent = cache(async (eventId: string) => {
  const userDto = await getUserDto();
  if (!userDto) redirect(AUTH_ROUTES.signIn);
  if (!isStaff(userDto.role)) redirect("/");
  return _getAllOrdersForEvent(eventId);
});
