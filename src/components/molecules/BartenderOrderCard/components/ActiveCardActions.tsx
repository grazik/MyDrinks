"use client";
import { MouseEvent, useState, useTransition } from "react";
import { OrderStatus } from "@prisma/client";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import { Spinner } from "@/src/components/atoms/Spinner/Spinner";
import { Toast } from "@/src/components/atoms/Toast/Toast";
import { useToast } from "@/src/hooks/useToast";
import { updateOrderStatus } from "@/src/actions/updateOrderStatus";
import { ALLOWED_TRANSITIONS } from "@/src/constants/order";

type TransitionMeta = {
  label: string;
  tone: "primary" | "success" | "danger";
  fill: "solid" | "outline";
  emphasis: "primary" | "secondary";
};

/** How each transition renders, keyed by destination status. Cancel is just the danger edge — no special-casing in the view. `null` = nothing transitions into that status today (e.g. no reopen back to PENDING). */
const TRANSITION_META: Record<OrderStatus, TransitionMeta | null> = {
  [OrderStatus.PENDING]: null,
  [OrderStatus.MIXING]: {
    label: "Start Mixing",
    tone: "primary",
    fill: "solid",
    emphasis: "primary",
  },
  [OrderStatus.READY]: {
    label: "Mark Ready",
    tone: "success",
    fill: "solid",
    emphasis: "primary",
  },
  [OrderStatus.COMPLETED]: {
    label: "Complete",
    tone: "primary",
    fill: "solid",
    emphasis: "primary",
  },
  [OrderStatus.CANCELLED]: {
    label: "Cancel",
    tone: "danger",
    fill: "outline",
    emphasis: "secondary",
  },
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

  // The card shows the secondary (cancel) action on the left and the primary
  // advance action on the right. ALLOWED_TRANSITIONS lists the forward move
  // first and cancel last, so sort cancel to the front to keep that layout.
  const targets = ALLOWED_TRANSITIONS[status].toSorted((a, b) => {
    if (a === OrderStatus.CANCELLED) return -1;
    if (b === OrderStatus.CANCELLED) return 1;
    return 0;
  });

  return (
    <>
      <Toast {...toastProps} />
      <div className="bartender-order-card__actions">
        {targets.map((target) => {
          const meta = TRANSITION_META[target];

          if (!meta) return null;

          return (
            <Cta
              key={target}
              className={`bartender-order-card__action--${meta.emphasis}`}
              borderRadius="4px"
              fill={meta.fill}
              tone={meta.tone}
              disabled={isPending}
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                runUpdate(target);
              }}
            >
              {isPending && pendingStatus === target && <Spinner />}{" "}
              {meta.label}
            </Cta>
          );
        })}
      </div>
    </>
  );
};
