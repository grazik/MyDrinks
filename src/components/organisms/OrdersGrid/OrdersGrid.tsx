import { Grid } from "@/src/components/molecules/Grid/Grid";
import { ComponentProps } from "react";

const DEFAULT_COLS: ComponentProps<typeof Grid>["cols"] = {
  mobile: 1,
  tabletLandscape: 2,
  desktop: 3,
};

type OrdersGridProps = {
  children: React.ReactNode;
  cols?: ComponentProps<typeof Grid>["cols"];
};

export const OrdersGrid = ({
  children,
  cols = DEFAULT_COLS,
}: OrdersGridProps) => {
  return <Grid cols={cols}>{children}</Grid>;
};
