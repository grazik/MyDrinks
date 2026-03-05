import { Grid } from "@/src/components/molecules/Grid/Grid";

type OrdersGridProps = {
  children: React.ReactNode;
};

export const OrdersGrid = ({ children }: OrdersGridProps) => {
  return (
    <Grid cols={{ mobile: 1, tabletLandscape: 2, desktop: 3 }}>
      {children}
    </Grid>
  );
};
