"use client";

import { useState, useTransition } from "react";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import { Spinner } from "@/src/components/atoms/Spinner/Spinner";
import { Toast } from "@/src/components/atoms/Toast/Toast";
import { useToast } from "@/src/hooks/useToast";
import { cancelOwnOrder } from "@/src/actions/cancelOwnOrder";

type CancelOrderProps = {
  orderId: string;
};

export const CancelOrder = ({ orderId }: CancelOrderProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const { toastProps, showToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await cancelOwnOrder(orderId);

      if (!result.ok) {
        showToast(result.message);
        setIsConfirming(false);
      }
    });
  };

  return (
    <>
      <Toast {...toastProps} />
      {isConfirming ? (
        <>
          <Cta
            fill="outline"
            tone="primary"
            disabled={isPending}
            onClick={() => setIsConfirming(false)}
          >
            Keep it
          </Cta>
          <Cta
            fill="solid"
            tone="danger"
            disabled={isPending}
            onClick={handleConfirm}
          >
            {isPending && <Spinner />} Confirm
          </Cta>
        </>
      ) : (
        <Cta fill="outline" tone="danger" onClick={() => setIsConfirming(true)}>
          Cancel
        </Cta>
      )}
    </>
  );
};
