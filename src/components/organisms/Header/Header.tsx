import { ContentBand } from "@/src/components/atoms/ContentBand/ContentBand";
import { Logo } from "@/src/components/atoms/Logo/Logo";

import "./header.scss";
import { Cta } from "@/src/components/atoms/Cta/Cta";

export const Header = () => {
  return (
    <ContentBand>
      <header className="header">
        <Logo />
        <div className="header__spacer" />
        <Cta href="/sing-in">Sign in</Cta>
      </header>
    </ContentBand>
  );
};
