import { StatusBar } from "@/src/components/molecules/OrderCard/components/StatusBar";
import {
  Header,
  HeaderVariant,
} from "@/src/components/molecules/OrderCard/components/Header";
import { OrderStatus } from "@prisma/client";

import "./order-card.scss";
import { CardContent } from "@/src/components/molecules/OrderCard/components/CardContent";
import {
  Actions,
  CancelOrder,
} from "@/src/components/molecules/OrderCard/components/Actions";
import { OrderWithDrink } from "@/src/types/order.types";

type OrderCardProps = {
  order: OrderWithDrink;
};

export const OrderCard = ({ order }: OrderCardProps) => {
  const { status } = order;

  if (status === OrderStatus.CANCELLED) {
    return <CancelledOrderCard order={order} />;
  }

  if (status === OrderStatus.COMPLETED) {
    return <CompletedOrderCard order={order} />;
  }

  return <ActiveOrderCard order={order} />;
};

const CancelledOrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="order-card order-card--cancelled">
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

const CompletedOrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="order-card order-card--completed">
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

const ActiveOrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="order-card">
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
          <CancelOrder />
        </Actions>
      )}
    </div>
  );
};
