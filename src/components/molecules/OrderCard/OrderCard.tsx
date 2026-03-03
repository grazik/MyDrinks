import { StatusBar } from "@/src/components/molecules/OrderCard/components/StatusBar";
import { Header } from "@/src/components/molecules/OrderCard/components/Header";
import { Prisma } from "@prisma/client";

import "./order-card.scss";
import { CardContent } from "@/src/components/molecules/OrderCard/components/CardContent";

type OrderWithDrink = Prisma.OrderGetPayload<{ include: { drink: true } }>;

type OrderCardProps = {
  order: OrderWithDrink;
};

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="order-card">
      <Header orderNumber={order.orderNumber} createdAt={order.createdAt} />
      <StatusBar status={order.status} />
      <CardContent
        image={order.drink.image}
        quantity={order.quantity}
        drinkName={order.drink.name}
      />
    </div>
  );
};
