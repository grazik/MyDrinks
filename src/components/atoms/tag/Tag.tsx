import React, { CSSProperties } from "react";
import "./tag.scss";
import { valuesToCssVariables } from "@/src/utils/valuesToCssVariables";

interface TagProps {
  title: string;
  bgColor?: string;
  color?: string;
  borderRadius?: number;
  variant?: "solid" | "subtle";
}

const VALUE_CSS_MAPPER = {
  bgColor: "--tag-bg-color",
  color: "--tag-color",
  borderRadius: "--tag-border-radius",
} as const;

const tagValuesToCssVariables = valuesToCssVariables(VALUE_CSS_MAPPER);

export const Tag = ({ title, variant = "solid", ...rest }: TagProps) => {
  const cssVariables = tagValuesToCssVariables(rest);

  return (
    <span
      className={`tag tag--${variant}`}
      style={cssVariables as CSSProperties}
    >
      {title}
    </span>
  );
};
