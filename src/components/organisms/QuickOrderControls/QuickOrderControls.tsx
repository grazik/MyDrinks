import { getUserDto } from "@/lib/auth/getUserDto";
import { getActiveEventWithDrinkIds } from "@/db/getEvent";
import { QuickOrderControlsClient } from "./QuickOrderControlsClient";

interface QuickOrderControlsProps {
  drinkId: string;
}

export const QuickOrderControls = async ({
  drinkId,
}: QuickOrderControlsProps) => {
  const [user, event] = await Promise.all([
    getUserDto(),
    getActiveEventWithDrinkIds(),
  ]);

  if (!user || !event) return null;

  const available = event.eventDrink.some((ed) => ed.drinkId === drinkId);

  return <QuickOrderControlsClient available={available} />;
};
