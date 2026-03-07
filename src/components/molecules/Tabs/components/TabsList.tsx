import { ReactNode } from "react";
import "./tabs-list.scss";

type TabsListProps = {
  children: ReactNode | ReactNode[];
};
export const TabsList = ({ children }: TabsListProps) => {
  return (
    <div className="tabs-list">
      <div role="tablist" className="tabs-list__inner">
        {children}
      </div>
    </div>
  );
};
