import "./content-band.scss";
import { ReactNode } from "react";

interface ContentBandProps {
  children: ReactNode;
}

export const ContentBand = ({ children }: ContentBandProps) => {
  return (
    <div className="content-band">
      <div className="wrapper">{children}</div>
    </div>
  );
};
