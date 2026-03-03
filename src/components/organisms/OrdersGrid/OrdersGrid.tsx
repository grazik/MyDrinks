import "./orders-grid.scss";

type OrdersGridProps = {
  children: React.ReactNode;
};

export const OrdersGrid = ({ children }: OrdersGridProps) => {
  return <div className="orders-grid">{children}</div>;
};
