"use client";
import { MouseEvent, useState, useTransition } from "react";
import { OrderStatus } from "@prisma/client";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import { Spinner } from "@/src/components/atoms/Spinner/Spinner";
import { Toast } from "@/src/components/atoms/Toast/Toast";
import { useToast } from "@/src/hooks/useToast";
import { updateOrderStatus } from "@/src/actions/updateOrderStatus";

const ADVANCE_LABEL: Partial<Record<OrderStatus, string>> = {
  [OrderStatus.PENDING]: "Start Mixing",
  [OrderStatus.MIXING]: "Mark Ready",
  [OrderStatus.READY]: "Complete",
};

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  [OrderStatus.PENDING]: OrderStatus.MIXING,
  [OrderStatus.MIXING]: OrderStatus.READY,
  [OrderStatus.READY]: OrderStatus.COMPLETED,
};

type ActiveCardActionsProps = {
  orderId: string;
  status: OrderStatus;
};

export const ActiveCardActions = ({
  orderId,
  status,
}: ActiveCardActionsProps) => {
  const { toastProps, showToast } = useToast();
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null);
  const [isPending, startTransition] = useTransition();

  const runUpdate = (nextStatus: OrderStatus) => {
    setPendingStatus(nextStatus);

    startTransition(async () => {
      const result = await updateOrderStatus(orderId, nextStatus);

      if (!result.ok) {
        showToast(result.message);
      }
    });
  };

  const nextStatus = NEXT_STATUS[status];

  return (
    <>
      <Toast {...toastProps} />
      <div className="bartender-order-card__actions">
        <Cta
          className="bartender-order-card__action--secondary"
          borderRadius="4px"
          fill="outline"
          tone="danger"
          disabled={isPending}
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            runUpdate(OrderStatus.CANCELLED);
          }}
        >
          {isPending && pendingStatus === OrderStatus.CANCELLED && <Spinner />}{" "}
          Cancel
        </Cta>
        {nextStatus && (
          <Cta
            className="bartender-order-card__action--primary"
            borderRadius="4px"
            tone={status === OrderStatus.MIXING ? "success" : "primary"}
            disabled={isPending}
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              runUpdate(nextStatus);
            }}
          >
            {isPending && pendingStatus === nextStatus && <Spinner />}{" "}
            {ADVANCE_LABEL[status]}
          </Cta>
        )}
      </div>
    </>
  );
};
