"use client";

import { useState, useTransition } from "react";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import { Spinner } from "@/src/components/atoms/Spinner/Spinner";
import { QuantityStepper } from "@/src/components/atoms/QuantityStepper/QuantityStepper";
import { Toast } from "@/src/components/atoms/Toast/Toast";
import type { OrderResult } from "@/src/actions/orderDrink";
import "./quick-order-controls.scss";
interface QuickOrderControlsClientProps {
  available: boolean;
  onOrder?: (quantity: number) => Promise<OrderResult>;
}

export const QuickOrderControlsClient = ({
  available = false,
  onOrder,
}: QuickOrderControlsClientProps) => {
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [isPending, startTransition] = useTransition();

  const handleOrder = () => {
    if (!onOrder) return;

    startTransition(async () => {
      const result = await onOrder(quantity);

      if (result.ok) {
        setToast({ message: "Order placed!", visible: true });
        setQuantity(1);
      } else {
        setToast({ message: result.message, visible: true });
      }

      setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 2500);
    });
  };

  if (!available) {
    return (
      <div className="quick-order-controls quick-order-controls--unavailable">
        <div className="quick-order-controls__unavailable-wrapper">
          <button
            type="button"
            className="quick-order-controls__unavailable-btn"
            disabled
          >
            Unavailable Tonight
          </button>
          <p className="quick-order-controls__micro-copy">
            This drink isn&apos;t on tonight&apos;s menu.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toast message={toast.message} visible={toast.visible} />
      <div className="quick-order-controls quick-order-controls--available">
        <QuantityStepper value={quantity} onChange={setQuantity} />
        <Cta
          className="quick-order-controls__order-btn"
          disabled={isPending}
          onClick={handleOrder}
        >
          {isPending && <Spinner />} Order Now
        </Cta>
      </div>
    </>
  );
};
