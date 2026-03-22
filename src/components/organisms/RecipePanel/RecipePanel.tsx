"use client";
import "./recipe-panel.scss";

import { useBreakpoint } from "@/src/hooks/useBreakpoint";
import { Drawer } from "@/src/components/molecules/Drawer/Drawer";
import { useContext, useLayoutEffect } from "react";
import { selectedOrderContext } from "@/src/contexts/SelectedOrderContext/selectedOrderContext";

const RecipePanelContent = () => {
  return <div>Yha</div>;
};

const DRAWER_CONFIG = {
  mobile: "bottom",
  tablet: "right",
} as const;

export const RecipePanel = () => {
  const breakpoint = useBreakpoint();
  const { setSelectedOrder, selectedOrder } = useContext(selectedOrderContext);

  useLayoutEffect(() => {
    setSelectedOrder(null);
  }, [breakpoint, setSelectedOrder]);

  if (breakpoint === "desktop") {
    return (
      <aside className="recipe-panel">
        <RecipePanelContent />
      </aside>
    );
  }

  return (
    <Drawer
      side={DRAWER_CONFIG[breakpoint]}
      isOpen={!!selectedOrder}
      onClose={() => {
        setSelectedOrder(null);
      }}
      label={""}
    >
      <RecipePanelContent />
    </Drawer>
  );
};
