import { create } from "zustand";
import { PromptState } from "../types";
import { MOCKED_PROMPTS } from "@/mock/prompts";

export const usePromptsStore = create<PromptState>((set) => ({
  prompts: [],
  loading: false,
  fetchPrompts: () => {
    set({ prompts: MOCKED_PROMPTS, loading: false });
  },
}));
