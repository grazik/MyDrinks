import { OrderStatus } from "@prisma/client";
import { ORDER_STATUS_LABEL } from "../utils";
import "./status-bar.scss";

const BarOrder = [
  OrderStatus.PENDING,
  OrderStatus.MIXING,
  OrderStatus.READY,
] as const;

type StatusBarProps = {
  status: OrderStatus;
};

const Segment = ({
  title,
  isActive = false,
}: {
  title: string;
  isActive: boolean;
}) => {
  return (
    <div
      className={`status-bar__segment ${isActive ? "status-bar__segment--active" : ""}`}
    >
      <span>{title}</span>
    </div>
  );
};

export const StatusBar = ({ status }: StatusBarProps) => {
  const statusIdx = BarOrder.findIndex((e) => e === status);
  const progressBarWidth = (statusIdx + 1) * (100 / BarOrder.length);

  return (
    <div
      className={`status-bar ${status === OrderStatus.READY ? "status-bar--success" : ""} `}
    >
      <div
        className="status-bar__color"
        style={{ transform: `scaleX(${progressBarWidth / 100})` }}
      />
      {status !== OrderStatus.READY ? (
        BarOrder.map((e, i) => (
          <Segment title={ORDER_STATUS_LABEL[e]} isActive={statusIdx >= i} key={e} />
        ))
      ) : (
        <Segment title={ORDER_STATUS_LABEL[OrderStatus.READY]} isActive={true} />
      )}
    </div>
  );
};
