import { create } from "zustand";
import { PromptState } from "../types";
import { getPrompts } from "@/service";

export const usePromptsStore = create<PromptState>((set) => ({
  prompts: [],
  loading: false,
  fetchPrompts: async () => {
    set({ loading: true });
    const prompts = await getPrompts();
    set({ prompts, loading: false });
  },
}));
