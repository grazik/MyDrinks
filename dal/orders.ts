import { cache } from "react";
import { redirect } from "next/navigation";
import { getUserDto } from "@/lib/auth/getUserDto";
import { isStaff } from "@/lib/auth/roles";
import {
  getUserOrdersForEvent,
  getAllOrdersForEvent as _getAllOrdersForEvent,
} from "@/db/getOrders";

export const getMyOrdersForEvent = cache(async (eventId: string) => {
  const userDto = await getUserDto();
  if (!userDto) redirect("/sign-in");
  return getUserOrdersForEvent(userDto.sub, eventId);
});

export const getAllOrdersForEvent = cache(async (eventId: string) => {
  const userDto = await getUserDto();
  if (!userDto) redirect("/sign-in");
  if (!isStaff(userDto.role)) redirect("/");
  return _getAllOrdersForEvent(eventId);
});
