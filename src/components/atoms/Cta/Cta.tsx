import { ReactNode, MouseEvent } from "react";
import Link from "next/link";

import "./cta.scss";

type CtaProps = ButtonProps | LinkProps;

interface CtaCommonProps {
  children: ReactNode;
}

interface ButtonProps extends CtaCommonProps {
  onClick: (e: MouseEvent) => void;
}

interface LinkProps extends CtaCommonProps {
  href: string;
  onClick?: (e: MouseEvent) => void;
}

const isLink = (props: CtaProps): props is LinkProps => "href" in props;

export const Cta = (props: CtaProps) => {
  const classNames = "cta button";

  if (isLink(props)) {
    return <Link className={classNames} {...props} />;
  }

  return <button className={classNames} {...props} />;
};
