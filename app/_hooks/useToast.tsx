"use client";

import { EventEmitter } from "events";
import { useState, useEffect, useRef, useCallback } from "react";
import { CancelIcon, LinkIcon, SaveFileIcon } from "../_components/ui/Icons";

export type Variants = "success" | "error";

type ToastProps = {
  info?: ToastType;
  visible: boolean;
};

type ToastType = {
  message: string;
  saveIcon: boolean | string;
  variants: Variants;
  position?: "top" | "bottom";
};

const toastEventEmitter = new EventEmitter();
const showToast = (toast: ToastType) => {
  toastEventEmitter.emit("showToast", toast);
};
const onShowToast = (callback: (toast: ToastType) => void) => {
  toastEventEmitter.on("showToast", callback);
};

// Toast component
const Toast: React.FC = () => {
  const [toast, setToast] = useState<ToastProps>({
    info: undefined,
    visible: false,
  });
  const [isHovered, setIsHovered] = useState(false);

  const { message, saveIcon, variants, position } = toast.info || {};
  const duration = 5000;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleShowToast = useCallback(
    (data: ToastType) => {
      setToast({ info: data, visible: true });
      clearTimer();
      timerRef.current = setTimeout(() => {
        setToast({ info: undefined, visible: false });
      }, duration);
    },
    [clearTimer, duration]
  );

  useEffect(() => {
    onShowToast(handleShowToast);
    return () => {
      toastEventEmitter.removeListener("showToast", handleShowToast);
      clearTimer();
    };
  }, [clearTimer, handleShowToast]);

  useEffect(() => {
    if (toast.visible && !isHovered) {
      timerRef.current = setTimeout(() => {
        setToast({ info: undefined, visible: false });
      }, duration);
    }
    return () => clearTimer();
  }, [isHovered, toast.visible, clearTimer]);

  const removeToast = () => {
    setToast({ info: undefined, visible: false });
    clearTimeout(timerRef.current!);
  };

  const toastVariant = {
    success: "bg-gray",
    error: "bg-red",
  };

  const className =
    position === "top" ? "top-6 bottom-auto" : "bottom-5 top-auto";

  return (
    toast.visible && (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed bottom-5 ${className} group -translate-x-1/2 left-1/2 z-50 text-[#FAFAFA] py-4 px-6 items-center w-[calc(100%-50px)] xs:!w-fit  rounded-[12px] flex gap-2 ${
          toastVariant[variants!]
        }`}
      >
        <div>
          {saveIcon === true ? (
            <SaveFileIcon />
          ) : saveIcon === "link" ? (
            <LinkIcon />
          ) : (
            <CancelIcon />
          )}
        </div>
        <p>{message}</p>

        <button
          className="group-hover:opacity-[1] transition-opacity opacity-0 flex-shrink-0"
          onClick={removeToast}
        >
          <CancelIcon />
        </button>
      </div>
    )
  );
};

export { Toast, showToast };
