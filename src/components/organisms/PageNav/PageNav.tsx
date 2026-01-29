import { ContentBand } from "@/src/components/atoms/ContentBand/ContentBand";
import { NavElement } from "@/src/components/molecules/NavElement/NavElement";

import "./page-nav.scss";
import { Suspense } from "react";

const links = [
  { title: "All Drinks", link: "/" },
  { title: "Events", link: "/events" },
];

export const PageNav = () => {
  return (
    <div className="page-nav">
      <ContentBand>
        <Suspense>
          <div className="page-nav__items">
            {links.map(({ title, link }) => (
              <NavElement title={title} link={link} key={title} />
            ))}
          </div>
        </Suspense>
      </ContentBand>
    </div>
  );
};
