import { useEffect } from "react";
import { useBrowserNotification } from "./useBrowserNotification";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export function useSse() {
  const { sendNotification } = useBrowserNotification();

  useEffect(() => {
    const eventSource = new EventSource(
      `${BASE_URL}/dashboard/alerts_notification`
    );

    eventSource.onmessage = function (event) {
      if (event.data.toLowerCase().includes("new alert detected")) {
        sendNotification("CodeGate Dashboard", {
          body: "New Alert detected!",
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [BASE_URL]);
}
