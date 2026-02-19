import { ContentBand } from "@/src/components/atoms/ContentBand/ContentBand";
import { Logo } from "@/src/components/atoms/Logo/Logo";
import { signOut } from "@/src/actions/signOut";
import { getUserDto } from "@/src/actions/getUserDto";

import "./header.scss";
import { Cta } from "@/src/components/atoms/Cta/Cta";

export const Header = async () => {
  const userDto = await getUserDto();
  const isAuthenticated = Boolean(userDto);

  return (
    <ContentBand>
      <header className="header">
        <Logo />
        <div className="header__spacer" />
        {isAuthenticated ? (
          <form action={signOut}>
            <Cta type="submit" fill="outline" tone="danger">
              Sign out
            </Cta>
          </form>
        ) : (
          <Cta href="/sign-in">Sign in</Cta>
        )}
      </header>
    </ContentBand>
  );
};
