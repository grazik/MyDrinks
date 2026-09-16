import { StatusBar } from "@/src/components/molecules/OrderCard/components/StatusBar";
import {
  Header,
  HeaderVariant,
} from "@/src/components/molecules/OrderCard/components/Header";
import { OrderStatus } from "@prisma/client";

import "./order-card.scss";
import { CardContent } from "@/src/components/molecules/OrderCard/components/CardContent";
import { Actions } from "@/src/components/molecules/OrderCard/components/Actions";
import { CancelOrder } from "@/src/components/molecules/OrderCard/components/CancelOrder";
import { OrderWithDrink } from "@/src/types/order.types";

type OrderCardProps = {
  order: OrderWithDrink;
  isRecentlyUpdated?: boolean;
};

const cardClassName = (variant: string | null, isRecentlyUpdated?: boolean) =>
  ["order-card", variant, isRecentlyUpdated && "order-card--just-updated"]
    .filter(Boolean)
    .join(" ");

// MUST be unique across rendered cards — a duplicate name aborts the whole
// view transition.
const viewTransitionStyle = (order: OrderWithDrink) => ({
  viewTransitionName: `user-order-${order.id}`,
});

export const OrderCard = ({ order, isRecentlyUpdated }: OrderCardProps) => {
  const { status } = order;

  if (status === OrderStatus.CANCELLED) {
    return (
      <CancelledOrderCard order={order} isRecentlyUpdated={isRecentlyUpdated} />
    );
  }

  if (status === OrderStatus.COMPLETED) {
    return (
      <CompletedOrderCard order={order} isRecentlyUpdated={isRecentlyUpdated} />
    );
  }

  return <ActiveOrderCard order={order} isRecentlyUpdated={isRecentlyUpdated} />;
};

const CancelledOrderCard = ({ order, isRecentlyUpdated }: OrderCardProps) => {
  return (
    <div
      className={cardClassName("order-card--cancelled", isRecentlyUpdated)}
      style={viewTransitionStyle(order)}
    >
      <Header
        orderNumber={order.orderNumber}
        createdAt={order.createdAt}
        variant={HeaderVariant.CANCELLED}
      />
      <p className="text-danger">
        Cancelled at:{" "}
        {order.updatedAt.toLocaleTimeString("pl-pl", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <CardContent
        image={order.drink.image}
        quantity={order.quantity}
        drinkName={order.drink.name}
      />
    </div>
  );
};

const CompletedOrderCard = ({ order, isRecentlyUpdated }: OrderCardProps) => {
  return (
    <div
      className={cardClassName("order-card--completed", isRecentlyUpdated)}
      style={viewTransitionStyle(order)}
    >
      <Header
        orderNumber={order.orderNumber}
        createdAt={order.createdAt}
        variant={HeaderVariant.COMPLETED}
      />
      <p className="text-success">
        Served at:{" "}
        {order.updatedAt.toLocaleTimeString("pl-pl", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <CardContent
        image={order.drink.image}
        quantity={order.quantity}
        drinkName={order.drink.name}
      />
    </div>
  );
};

const ActiveOrderCard = ({ order, isRecentlyUpdated }: OrderCardProps) => {
  return (
    <div
      className={cardClassName(
        order.status === OrderStatus.READY ? "order-card--ready" : null,
        isRecentlyUpdated,
      )}
      style={viewTransitionStyle(order)}
    >
      <Header
        orderNumber={order.orderNumber}
        createdAt={order.createdAt}
        variant={HeaderVariant.ACTIVE}
      />
      <StatusBar status={order.status} />
      <CardContent
        image={order.drink.image}
        quantity={order.quantity}
        drinkName={order.drink.name}
      />
      {order.status === OrderStatus.PENDING && (
        <Actions>
          <CancelOrder orderId={order.id} />
        </Actions>
      )}
    </div>
  );
};
