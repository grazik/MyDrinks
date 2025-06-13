import { Drink } from "@prisma/client";
import Image from "next/image";
import "./images-section.scss";

type Props = {
  drink: Drink;
};

export const ImagesSection = ({ drink }: Props) => {
  return (
    <section className={"images-section"}>
      <Image
        src={drink.image}
        alt={drink.name}
        fill={true}
        objectFit={"contain"}
      />
    </section>
  );
};
