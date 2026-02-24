import { ReactNode } from "react";
import "./banner.scss";

interface BannerProps {
  children: ReactNode;
  variant?: "danger";
}
export const Banner = ({ children, variant }: BannerProps) => {
  return (
    <div className={`banner ${variant ? `banner--${variant}` : ""}`}>
      {children}
    </div>
  );
};
