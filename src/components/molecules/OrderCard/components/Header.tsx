import "./header.scss";
import type { Order } from "@prisma/client";

type HeaderProps = {
  createdAt: Order["createdAt"];
  orderNumber: number;
};

export const Header = ({ createdAt, orderNumber }: HeaderProps) => {
  const time = createdAt.toLocaleTimeString("pl-pl", {
    minute: "2-digit",
    hour: "2-digit",
  });

  return (
    <div className="order-card__header">
      <p className={"body-text"}>
        Order #{String(orderNumber).padStart(3, "0")}
      </p>
      <p className={"body-text"}>{time}</p>
    </div>
  );
};
