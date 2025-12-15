"use client";

import ArrowLeft from "public/icons/arrow-left.svg";
import { useRouter } from "next/navigation";

import "./back-button.scss";

interface BackButtonProps {
  label: string;
}

export const BackButton = ({ label }: BackButtonProps) => {
  const router = useRouter();
  return (
    <button onClick={router.back} className={"back-button body-text"}>
      <ArrowLeft /> {label}
    </button>
  );
};
