import { StatusBar } from "@/src/components/molecules/OrderCard/components/StatusBar";
import { Header } from "@/src/components/molecules/OrderCard/components/Header";
import { OrderStatus } from "@prisma/client";

import "./order-card.scss";
import { CardContent } from "@/src/components/molecules/OrderCard/components/CardContent";

export const OrderCard = () => {
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <div className="order-card">
        <Header orderNumber={32} createdAt={new Date()} />
        <StatusBar status={OrderStatus.PENDING} />
        <CardContent
          image="/images/drinks/mohito.png"
          quantity={2}
          drinkName={"Mohito"}
        />
      </div>
      <div className="order-card">
        <Header orderNumber={32} createdAt={new Date()} />
        <StatusBar status={OrderStatus.MIXING} />
        <CardContent
          image="/images/drinks/mohito.png"
          quantity={2}
          drinkName={"Mohito"}
        />
      </div>
      <div className="order-card">
        <Header orderNumber={32} createdAt={new Date()} />
        <StatusBar status={OrderStatus.READY} />
        <CardContent
          image="/images/drinks/mohito.png"
          quantity={2}
          drinkName={"Mohito"}
        />
      </div>
    </div>
  );
};
