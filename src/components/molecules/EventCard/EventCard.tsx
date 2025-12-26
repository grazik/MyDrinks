import { Event } from "@prisma/client";
import "./event-card.scss";
import Image from "next/image";
import Link from "next/link";

type EventCardProps = {
  event: Event;
};

export const EventCard = ({ event }: EventCardProps) => {
  const { title, description, image, slug } = event;

  return (
    <Link href={`/events/${slug}`} className="event-card">
      <div className="event-card__image-wrapper">
        {image && (
          <Image
            className="event-card__image"
            src={image}
            alt=""
            fill={true}
            objectFit={"cover"}
          />
        )}
        <div className="event-card__text-box">
          <p className="card-title">{title}</p>
        </div>
      </div>
      <p className="body-text event-card__description">{description}</p>
    </Link>
  );
};
