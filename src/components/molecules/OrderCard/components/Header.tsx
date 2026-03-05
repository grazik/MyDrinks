import "./header.scss";
import { Tag } from "@/src/components/atoms/tag/Tag";
import tokens from "@/src/styles/tokens.module.scss";
import { OrderStatus } from "@prisma/client";

export enum HeaderVariant {
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export const HeaderVariantMapper: Record<OrderStatus, HeaderVariant> = {
  [OrderStatus.READY]: HeaderVariant.ACTIVE,
  [OrderStatus.MIXING]: HeaderVariant.ACTIVE,
  [OrderStatus.PENDING]: HeaderVariant.ACTIVE,
  [OrderStatus.CANCELLED]: HeaderVariant.CANCELLED,
  [OrderStatus.COMPLETED]: HeaderVariant.COMPLETED,
};

interface HeaderProps {
  variant: HeaderVariant;
  orderNumber?: number;
  createdAt: Date;
}

export const Header = ({ variant, orderNumber, createdAt }: HeaderProps) => {
  const time = createdAt.toLocaleTimeString("pl-pl", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = createdAt.toLocaleDateString("pl-pl", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const leftContent =
    variant === HeaderVariant.ACTIVE
      ? `Order #${String(orderNumber).padStart(3, "0")}`
      : date;

  const rightContent = {
    [HeaderVariant.ACTIVE]: <p className="body-text">{time}</p>,
    [HeaderVariant.COMPLETED]: (
      <Tag
        bgColor={tokens.colorLimeGreen}
        color={tokens.colorBackground}
        title="Completed!"
        variant="subtle"
      />
    ),
    [HeaderVariant.CANCELLED]: (
      <Tag
        bgColor={tokens.colorCherryRed}
        color={tokens.colorTextLight}
        title="Cancelled"
        variant="subtle"
      />
    ),
  }[variant];

  return (
    <div className="order-card__header">
      <p className="body-text">{leftContent}</p>
      {rightContent}
    </div>
  );
};
