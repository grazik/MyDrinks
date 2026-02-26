"use client";

import { useState, useTransition } from "react";
import { Cta } from "@/src/components/atoms/Cta/Cta";
import { Spinner } from "@/src/components/atoms/Spinner/Spinner";
import { QuantityStepper } from "@/src/components/atoms/QuantityStepper/QuantityStepper";
import { Toast } from "@/src/components/atoms/Toast/Toast";
import "./quick-order-controls.scss";
interface QuickOrderControlsProps {
  available: boolean;
  onOrder?: (quantity: number) => Promise<void>;
}

export const QuickOrderControls = ({
  available = false,
  onOrder,
}: QuickOrderControlsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleOrder = () => {
    if (!onOrder) return;

    startTransition(async () => {
      await onOrder(quantity);
      setShowToast(true);
      setQuantity(1);
      setTimeout(() => setShowToast(false), 2500);
    });
  };

  if (!available) {
    return (
      <div className="quick-order-controls">
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
      <Toast message="Order placed!" visible={showToast} />
      <div className="quick-order-controls quick-order-controls--sticky">
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
