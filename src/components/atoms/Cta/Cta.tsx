import {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  CSSProperties,
} from "react";
import Link from "next/link";
import { valuesToCssVariables } from "@/src/utils/valuesToCssVariables";

import "./cta.scss";

type CtaFill = "solid" | "outline";
type CtaTone = "primary" | "danger" | "success";

const VALUE_CSS_MAPPER = {
  borderRadius: "--cta-border-radius",
} as const;

const ctaValuesToCssVariables = valuesToCssVariables(VALUE_CSS_MAPPER);

interface CommonCtaProps {
  children: ReactNode;
  fill?: CtaFill;
  tone?: CtaTone;
  borderRadius?: string;
}

type ButtonProps = CommonCtaProps & ButtonHTMLAttributes<HTMLButtonElement>;

type LinkProps = CommonCtaProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type CtaProps = ButtonProps | LinkProps;

export const Cta = ({
  fill = "solid",
  tone = "primary",
  className,
  borderRadius,
  ...rest
}: CtaProps) => {
  const classNames = [
    "cta",
    "button",
    `cta--fill-${fill}`,
    `cta--tone-${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const cssVariables = ctaValuesToCssVariables({ borderRadius });

  if ("href" in rest) {
    return (
      <Link
        className={classNames}
        style={cssVariables as CSSProperties}
        {...rest}
      />
    );
  }

  return (
    <button
      className={classNames}
      style={cssVariables as CSSProperties}
      {...rest}
    />
  );
};
