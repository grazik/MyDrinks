import "./grid.scss";
import { CSSProperties } from "react";

type GridCols = {
  mobile: number;
  tablet?: number;
  tabletLandscape?: number;
  desktop?: number;
};

type GridProps = {
  children: React.ReactNode;
  cols: GridCols;
};

export const Grid = ({ children, cols }: GridProps) => {
  const tablet = cols.tablet ?? cols.mobile;
  const tabletLandscape = cols.tabletLandscape ?? tablet;
  const desktop = cols.desktop ?? tabletLandscape;

  return (
    <div
      className="grid"
      style={
        {
          "--cols-mobile": cols.mobile,
          "--cols-tablet": tablet,
          "--cols-tablet-landscape": tabletLandscape,
          "--cols-desktop": desktop,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
};
