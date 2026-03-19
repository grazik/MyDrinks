"use client";
import { OrderStatus } from "@prisma/client";
import { Cta } from "@/src/components/atoms/Cta/Cta";

const ADVANCE_LABEL: Partial<Record<OrderStatus, string>> = {
  [OrderStatus.PENDING]: "Start Mixing",
  [OrderStatus.MIXING]: "Mark Ready",
  [OrderStatus.READY]: "Complete",
};

type ActiveCardActionsProps = {
  status: OrderStatus;
};

export const ActiveCardActions = ({ status }: ActiveCardActionsProps) => {
  return (
    <div className="bartender-order-card__actions">
      <Cta
        className="bartender-order-card__action--secondary"
        borderRadius="4px"
        fill="outline"
        tone="danger"
        onClick={() => {}}
      >
        Cancel
      </Cta>
      <Cta
        className="bartender-order-card__action--primary"
        borderRadius="4px"
        tone={status === OrderStatus.MIXING ? "success" : "primary"}
        onClick={() => {}}
      >
        {ADVANCE_LABEL[status]}
      </Cta>
    </div>
  );
};
