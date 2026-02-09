"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import "./nav-element.scss";

interface NavElementProps {
  title: string;
  link: string;
}

export const NavElement = ({ title, link }: NavElementProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = pathname === link;

  const href =
    isActive && searchParams.toString()
      ? `${link}?${searchParams.toString()}`
      : link;

  return (
    <Link
      href={href}
      className={`nav-element body-text ${isActive ? "nav-element--active" : ""}`}
      scroll={false}
    >
      {title}
    </Link>
  );
};
