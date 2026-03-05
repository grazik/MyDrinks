import { Cta } from "@/src/components/atoms/Cta/Cta";
import { ReactNode } from "react";
import "./actions.scss";

type ActionsProps = {
  children: ReactNode | ReactNode[];
};

export const CancelOrder = () => {
  return (
    <Cta fill="outline" tone={"danger"}>
      Cancel
    </Cta>
  );
};

export const Actions = ({ children }: ActionsProps) => {
  return <div className="order-card__actions">{children}</div>;
};
