import { createContext } from "react";

type VirginOrderContext = {
  isVirgin: boolean;
  setIsVirgin: (isVirgin: boolean) => void;
};

export const virginOrderContext = createContext<VirginOrderContext>({
  isVirgin: false,
  setIsVirgin: () => {},
});
