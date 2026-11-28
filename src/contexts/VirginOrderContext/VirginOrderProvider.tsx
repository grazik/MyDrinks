"use client";

import { ReactNode, useState } from "react";
import { virginOrderContext } from "@/src/contexts/VirginOrderContext/virginOrderContext";

type VirginOrderProviderProps = {
  children: ReactNode;
};

export const VirginOrderProvider = ({ children }: VirginOrderProviderProps) => {
  const [isVirgin, setIsVirgin] = useState(false);

  return (
    <virginOrderContext.Provider value={{ isVirgin, setIsVirgin }}>
      {children}
    </virginOrderContext.Provider>
  );
};
