import { StatusBar } from "@/src/components/molecules/OrderCard/components/StatusBar";
import { OrderStatus } from "@prisma/client";

export const OrderCard = () => {
  return (
    <div>
      <StatusBar status={OrderStatus.PENDING} />
      <StatusBar status={OrderStatus.MIXING} />
      <StatusBar status={OrderStatus.READY} />
    </div>
  );
};
