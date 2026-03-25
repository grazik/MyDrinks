"use client";

import { ReactNode, useState } from "react";
import { selectedOrderContext } from "@/src/contexts/SelectedOrderContext/selectedOrderContext";
import { OrderWithDrinkWithIngredientsAndUser } from "@/src/types/order.types";

type SelectedOrderProviderProps = {
  children: ReactNode;
};

export const SelectedOrderProvider = ({
  children,
}: SelectedOrderProviderProps) => {
  const [selectedOrder, setSelectedOrder] =
    useState<Nullable<OrderWithDrinkWithIngredientsAndUser>>(null);

  return (
    <selectedOrderContext.Provider value={{ selectedOrder, setSelectedOrder }}>
      {children}
    </selectedOrderContext.Provider>
  );
};
