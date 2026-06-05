import { useCallback, useEffect, useRef, useState } from "react";

type ToastVariant = "success" | "error";

type ToastState = {
  message: string;
  visible: boolean;
  variant: ToastVariant;
};

const HIDDEN_TOAST: ToastState = {
  message: "",
  visible: false,
  variant: "success",
};

export const useToast = (duration = 2500) => {
  const [toastProps, setToastProps] = useState<ToastState>(HIDDEN_TOAST);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "error") => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setToastProps({ message, visible: true, variant });

      timeoutRef.current = setTimeout(
        () => setToastProps((prev) => ({ ...prev, visible: false })),
        duration,
      );
    },
    [duration],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { toastProps, showToast };
};
