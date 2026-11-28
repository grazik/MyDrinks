import { ReactNode } from "react";
import Image from "next/image";
import "./card-content.scss";

interface CardContentProps {
  image: string | null;
  quantity: number;
  drinkName: string;
  children?: ReactNode;
}

export const CardContent = ({
  image,
  quantity,
  drinkName,
  children,
}: CardContentProps) => {
  return (
    <div className="order-card__content">
      {image && (
        <Image
          className="order-card__content-image"
          src={image}
          alt={""}
          width={80}
          height={120}
        />
      )}
      <div className="order-card__text">
        <p className={"body-text"}>
          {quantity}x {drinkName}
        </p>
        {children}
      </div>
    </div>
  );
};
