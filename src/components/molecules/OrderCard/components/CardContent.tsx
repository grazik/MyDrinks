import Image from "next/image";
import "./card-content.scss";

interface CardContentProps {
  image: string | null;
  quantity: number;
  drinkName: string;
}

export const CardContent = ({
  image,
  quantity,
  drinkName,
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
      <p className={"body-text"}>
        {quantity}x {drinkName}
      </p>
    </div>
  );
};
