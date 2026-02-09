import { Event } from "@prisma/client";
import Image from "next/image";

import "./event-page-header.scss";

type EventPageHeaderProps = Pick<Event, "image" | "title" | "description">;

export const EventPageHeader = ({
  title,
  description,
  image,
}: EventPageHeaderProps) => {
  return (
    <div className="event-page-header">
      <Image
        src={image}
        alt={""}
        fill={true}
        className={"event-page-header__image"}
      />
      <div className="wrapper">
        <div className="event-page-header__text">
          <h1 className="main-heading">{title}</h1>
          <p className="body-text">{description}</p>
        </div>
      </div>
    </div>
  );
};
