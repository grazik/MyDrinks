"use client";

import { useState, useTransition } from "react";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import { Spinner } from "@/src/components/atoms/Spinner/Spinner";
import { Toast } from "@/src/components/atoms/Toast/Toast";
import { cancelOwnOrder } from "@/src/actions/cancelOwnOrder";

type CancelOrderProps = {
  orderId: string;
};

export const CancelOrder = ({ orderId }: CancelOrderProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await cancelOwnOrder(orderId);

      if (!result.ok) {
        setError(result.message);
        setIsConfirming(false);
        setTimeout(() => setError(null), 2500);
      }
    });
  };

  return (
    <>
      <Toast message={error ?? ""} visible={Boolean(error)} variant="error" />
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
