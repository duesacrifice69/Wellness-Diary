import { useCallback, useEffect, useState } from "react";
import { Cross } from "../Icon";
let oTimeout;
let cTimeout;
let popup;
let popout;

export default function Notification({
  type = "info",
  message,
  fixed = false,
  timestamp,
  duration = 5000,
  setNotification,
}) {
  const bgColor =
    type === "info"
      ? "bg-primary"
      : type === "success"
      ? "bg-green-500"
      : "bg-red-600";

  const [opacity, setOpacity] = useState(0);

  const handleClose = useCallback(() => {
    popout = setInterval(() => {
      setOpacity((o) => {
        if (o <= 0) {
          clearInterval(popout);
          return -0.1;
        }
        return o - 0.1;
      });
    }, 50);
  }, []);

  const handleOpen = useCallback(() => {
    popup = setInterval(() => {
      setOpacity((o) => {
        if (o >= 1) {
          clearInterval(popup);
          return 1;
        }
        return o + 0.1;
      });
    }, 50);
  }, []);

  useEffect(() => {
    if (!fixed) {
      oTimeout = setTimeout(() => {
        handleClose();
      }, duration);
    }
    if (message) {
      handleOpen();
    }

    return () => {
      clearTimeout(oTimeout);
      clearInterval(popout);
      clearInterval(popup);
    };
  }, [message, duration, fixed, type, handleClose, handleOpen, timestamp]);

  useEffect(() => {
    if (opacity < 0) {
      cTimeout = setTimeout(() => {
        setNotification(null);
      }, 1000);
    }
    console.log(opacity);
    return () => clearTimeout(cTimeout);
  }, [opacity, setNotification]);

  return (
    <>
      {message && (
        <div
          className={
            "fixed top-44 right-4 z-10 px-5 py-2 rounded-lg flex text-textPrimary gap-8 items-center justify-between " +
            bgColor
          }
          style={{ opacity }}
        >
          <div className="">
            {message.length > 50 ? message.slice(0, 50) : message}
          </div>
          <div
            className="rounded-full cursor-pointer hover:bg-[rgba(0,0,0,0.1)] p-1"
            onClick={handleClose}
          >
            <Cross />
          </div>
        </div>
      )}
    </>
  );
}
