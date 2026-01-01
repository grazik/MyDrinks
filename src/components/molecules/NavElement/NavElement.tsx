import Link from "next/link";
import "./nav-element.scss";

interface NavElementProps {
  title: string;
  link: string;
  isActive: boolean;
}

export const NavElement = ({ title, link, isActive }: NavElementProps) => {
  return (
    <Link
      href={link}
      className={`nav-element body-text ${isActive ? "nav-element--active" : ""}`}
    >
      {title}
    </Link>
  );
};
