import { ComponentType } from "react";
import { OrderWithDrinkAndUser, Order } from "@/src/types/order.types";
import { QuantityBadge } from "@/src/components/molecules/BartenderOrderCard/components/QuantityBadge";
import { ActiveCardActions } from "@/src/components/molecules/BartenderOrderCard/components/ActiveCardActions";
import { TimeFromNow } from "@/src/components/atoms/TimeFromNow/TimeFromNow";
import { OrderStatus } from "@prisma/client";
import CheckIcon from "public/icons/check.svg";
import XCircleIcon from "public/icons/x-circle.svg";

import "./bartender-order-card.scss";

type BartenderOrderCardProps = {
  order: OrderWithDrinkAndUser;
  onClick?: () => void;
  isSelected?: boolean;
};

const isHistoryCard = (order: Order) => {
  return (
    order.status === OrderStatus.COMPLETED ||
    order.status === OrderStatus.CANCELLED
  );
};

export const BartenderOrderCard = ({
  order,
  onClick,
  isSelected,
}: BartenderOrderCardProps) => {
  if (isHistoryCard(order)) {
    return (
      <HistoryCard order={order} onClick={onClick} isSelected={isSelected} />
    );
  }

  return <ActiveCard order={order} onClick={onClick} isSelected={isSelected} />;
};

const ActiveCard = ({
  order,
  onClick,
  isSelected,
}: BartenderOrderCardProps) => {
  return (
    <div
      className={`bartender-order-card ${isSelected ? "bartender-order-card--selected" : ""}`}
      onClick={onClick}
    >
      <div className="bartender-order-card__header">
        <TimeFromNow date={order.updatedAt} />
        <QuantityBadge quantity={order.quantity} />
      </div>
      <div className="bartender-order-card__body">
        <p className="body-text">{order.drink.name}</p>
        <p className="bartender-order-card__user">For: {order.user.name}</p>
      </div>
      <ActiveCardActions status={order.status} />
    </div>
  );
};

type HistoryStatusConfig = {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  className: string;
  strikethrough: boolean;
};

const HISTORY_STATUS_CONFIG: Partial<Record<OrderStatus, HistoryStatusConfig>> =
  {
    [OrderStatus.COMPLETED]: {
      Icon: CheckIcon,
      label: "Served at",
      className: "bartender-order-card__status--completed",
      strikethrough: false,
    },
    [OrderStatus.CANCELLED]: {
      Icon: XCircleIcon,
      label: "Cancelled at",
      className: "bartender-order-card__status--cancelled",
      strikethrough: true,
    },
  };

const HistoryCard = ({
  order,
  onClick,
  isSelected,
}: BartenderOrderCardProps) => {
  const config = HISTORY_STATUS_CONFIG[order.status];

  if (!config) return null;

  const { Icon } = config;

  const time = order.updatedAt.toLocaleTimeString("pl-pl", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`bartender-order-card bartender-order-card--history ${isSelected ? "bartender-order-card--selected" : ""}`}
      onClick={onClick}
    >
      <p className={`bartender-order-card__status ${config.className}`}>
        <Icon className="bartender-order-card__status-icon" />
        {config.label} {time}
      </p>
      <div className="bartender-order-card__body">
        <p
          className={`body-text${config.strikethrough ? " bartender-order-card__drink--cancelled" : ""}`}
        >
          {order.quantity}× {order.drink.name}
        </p>
        <p className="bartender-order-card__user">For: {order.user.name}</p>
      </div>
    </div>
  );
};
