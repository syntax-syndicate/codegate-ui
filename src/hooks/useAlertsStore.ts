import { create } from "zustand";
import { AlertState } from "../types";
import { MOCKED_ALERTS } from "@/mock/alerts";

export const useAlertsStore = create<AlertState>((set) => ({
  alerts: [],
  fetchAlerts: () => {
    set({ alerts: MOCKED_ALERTS });
  },
}));
