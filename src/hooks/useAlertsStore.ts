import { create } from "zustand";
import { AlertState } from "../types";
import { MOCKED_ALERTS } from "@/mock/alerts";

export const useAlertsStore = create<AlertState>((set) => ({
  alerts: [],
  loading: false,
  fetchAlerts: () => {
    set({ loading: true });
    setTimeout(() => {
      set({ alerts: MOCKED_ALERTS, loading: false });
    }, 2000);
  },
}));
