import { ReactNode } from "react";
import { Tag } from "@/src/components/atoms/tag/Tag";
import tokens from "@/src/styles/tokens.module.scss";
import { OrderWithDrinkWithIngredients } from "@/src/types/order.types";
import { getOrderKind, OrderKind } from "@/src/utils/orders/orders";
import {
  formatIngredientNames,
  getAlcoholicIngredientNames,
  IngredientListStyle,
} from "@/src/utils/drinks/drinks";

type OrderMarkersProps = {
  order: Pick<OrderWithDrinkWithIngredients, "isVirgin" | "drink">;
};

type OrderDrink = OrderMarkersProps["order"]["drink"];

const VirginMarkers = ({ drink }: { drink: OrderDrink }) => (
  <>
    <Tag
      title="Virgin"
      bgColor={tokens.colorIceAqua}
      color={tokens.colorBackground}
    />
    <p className="order-card__omitted">
      Without{" "}
      {formatIngredientNames(
        getAlcoholicIngredientNames(drink),
        IngredientListStyle.LABEL,
      )}
    </p>
  </>
);

const MARKERS: Record<OrderKind, (drink: OrderDrink) => ReactNode> = {
  [OrderKind.REGULAR]: () => null,
  [OrderKind.VIRGIN]: (drink) => <VirginMarkers drink={drink} />,
  [OrderKind.MOCKTAIL]: () => (
    <Tag title="Mocktail" bgColor={tokens.colorIceAqua} variant="subtle" />
  ),
};

export const OrderMarkers = ({ order }: OrderMarkersProps) =>
  MARKERS[getOrderKind(order)](order.drink);
