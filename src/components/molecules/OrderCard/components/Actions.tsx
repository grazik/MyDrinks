import { ReactNode } from "react";
import "./actions.scss";

type ActionsProps = {
  children: ReactNode | ReactNode[];
};

export const Actions = ({ children }: ActionsProps) => {
  return <div className="order-card__actions">{children}</div>;
};
