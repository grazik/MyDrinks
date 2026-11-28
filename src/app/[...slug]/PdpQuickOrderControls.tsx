import { Drink } from "@prisma/client";
import { getUserDto } from "@/lib/auth/getUserDto";
import { getActiveEventWithDrinkIds } from "@/db/getEvent";
import { QuickOrderControls } from "@/src/components/organisms/QuickOrderControls/QuickOrderControls";
import "./pdp-quick-order-controls.scss";

export const PdpQuickOrderControls = async ({
  drink,
}: {
  drink: Pick<Drink, "id" | "isVirginAllowed">;
}) => {
  const [user, event] = await Promise.all([
    getUserDto(),
    getActiveEventWithDrinkIds(),
  ]);

  if (!user || !event) return null;

  return (
    <div className="pdp-quick-order-controls">
      <QuickOrderControls drink={drink} />
    </div>
  );
};
