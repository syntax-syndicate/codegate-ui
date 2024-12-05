import { create } from "zustand";
import { AlertState } from "../types";
import { getAlerts } from "@/service";

export const useAlertsStore = create<AlertState>((set) => ({
  alerts: [],
  loading: false,
  fetchAlerts: async () => {
    set({ loading: true });
    const alerts = await getAlerts();
    set({ alerts, loading: false });
  },
}));
