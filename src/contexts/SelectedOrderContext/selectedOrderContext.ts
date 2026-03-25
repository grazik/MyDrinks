import { createContext } from "react";
import { OrderWithDrinkWithIngredientsAndUser } from "@/src/types/order.types";

type SelectedOrderContext = {
  selectedOrder: Nullable<OrderWithDrinkWithIngredientsAndUser>;
  setSelectedOrder: (
    order: Nullable<OrderWithDrinkWithIngredientsAndUser>,
  ) => void;
};

export const selectedOrderContext = createContext<SelectedOrderContext>({
  selectedOrder: null,
  setSelectedOrder: () => {},
});
