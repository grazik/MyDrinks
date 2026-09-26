import { ContentBand } from "@/src/components/atoms/ContentBand/ContentBand";
import { Logo } from "@/src/components/atoms/Logo/Logo";
import { signOut } from "@/src/actions/signOut";
import { getUserDto } from "@/lib/auth/getUserDto";
import { isStaff } from "@/lib/auth/roles";
import Link from "next/link";
import DashboardIcon from "public/icons/dashboard.svg";
import ReceiptIcon from "public/icons/receipt.svg";

import "./header.scss";
import { Cta } from "@/src/components/atoms/Cta/Cta";

export const Header = async () => {
  const userDto = await getUserDto();
  const isAuthenticated = Boolean(userDto);
  const isBarman = isStaff(userDto?.role);

  return (
    <ContentBand>
      <header className="header">
        <Logo />
        <div className="header__spacer" />
        {isAuthenticated ? (
          <>
            {isBarman && (
              <Link href="/dashboard" className="header__orders-link">
                <DashboardIcon />
                <span className="header__link-label">Dashboard</span>
              </Link>
            )}
            <Link href="/orders" className="header__orders-link">
              <ReceiptIcon />
              <span className="header__link-label">My Orders</span>
            </Link>
            <form action={signOut}>
              <Cta
                type="submit"
                fill="outline"
                tone="danger"
                className="header__sign-out"
              >
                Sign out
              </Cta>
            </form>
          </>
        ) : (
          <Cta href="/sign-in">Sign in</Cta>
        )}
      </header>
    </ContentBand>
  );
};
