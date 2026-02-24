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

type ButtonProps = CommonCtaProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkProps = CommonCtaProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type CtaProps = ButtonProps | LinkProps;

const isLink = (props: CtaProps): props is LinkProps => "href" in props;

export const Cta = (props: CtaProps) => {
  const { fill = "solid", tone = "primary" } = props;

  const classNames = `cta button cta--fill-${fill} cta--tone-${tone}`;

  if (isLink(props)) {
    return <Link className={classNames} {...props} />;
  }

  return <button className={classNames} {...props} />;
};
