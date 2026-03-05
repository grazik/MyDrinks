import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import Link from "next/link";

import "./cta.scss";

type CtaFill = "solid" | "outline";
type CtaTone = "primary" | "danger";

interface CommonCtaProps {
  children: ReactNode;
  fill?: CtaFill;
  tone?: CtaTone;
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

  if ("href" in rest) {
    return <Link className={classNames} {...rest} />;
  }

  return <button className={classNames} {...rest} />;
};
