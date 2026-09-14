"use client";

import { MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ArrowLeft from "public/icons/arrow-left.svg";

import "./back-button.scss";

interface BackButtonProps {
  label: string;
  fallbackHref: string;
}

// Navigation API isn't in TypeScript's DOM lib yet.
type WindowWithNavigation = Window & {
  navigation?: { canGoBack: boolean };
};

const canGoBackInApp = () =>
  (window as WindowWithNavigation).navigation?.canGoBack === true;

export const BackButton = ({ label, fallbackHref }: BackButtonProps) => {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!canGoBackInApp()) {
      return;
    }

    event.preventDefault();
    router.back();
  };

  return (
    <Link
      href={fallbackHref}
      onClick={handleClick}
      className={"back-button body-text"}
    >
      <ArrowLeft /> {label}
    </Link>
  );
};
