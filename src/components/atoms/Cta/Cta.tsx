import { ReactNode, MouseEvent, HTMLAttributes } from "react";
import Link from "next/link";

import "./cta.scss";

type CtaProps = ButtonProps | LinkProps;

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClick: (e: MouseEvent) => void;
  children: ReactNode;
}

interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  onClick?: (e: MouseEvent) => void;
  children: ReactNode;
}

const isLink = (props: CtaProps): props is LinkProps => "href" in props;

export const Cta = (props: CtaProps) => {
  const classNames = "cta button";

  if (isLink(props)) {
    return <Link className={classNames} {...props} />;
  }

  return <button className={classNames} {...props} />;
};
