import { QuickOrderControls } from "@/src/components/organisms/QuickOrderControls/QuickOrderControls";
import "./pdp-quick-order-controls.scss";

export const PdpQuickOrderControls = ({ drinkId }: { drinkId: string }) => (
  <div className="pdp-quick-order-controls">
    <QuickOrderControls drinkId={drinkId} />
  </div>
);
