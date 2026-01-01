import { ContentBand } from "@/src/components/atoms/ContentBand/ContentBand";
import { NavElement } from "@/src/components/molecules/NavElement/NavElement";

import "./homepage-nav.scss";

const links = [
  { title: "All Drinks", link: "/", isActive: true },
  { title: "Events", link: "/events", isActive: false },
];

export const HomePageNav = () => {
  return (
    <div className="homepage-nav">
      <ContentBand>
        <div className="homepage-nav__items">
          {links.map(({ title, link, isActive }) => (
            <NavElement
              title={title}
              link={link}
              isActive={isActive}
              key={title}
            />
          ))}
        </div>
      </ContentBand>
    </div>
  );
};
