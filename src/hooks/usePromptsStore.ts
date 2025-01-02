import { create } from "zustand";
import { PromptState } from "../types";
import { getPrompts } from "@/service";

export const usePromptsStore = create<PromptState>((set) => ({
  prompts: [],
  loading: false,
  currentPromptId: "",
  setCurrentPromptId: (id: string) => set({ currentPromptId: id }),
  fetchPrompts: async () => {
    set({ loading: true });
    const prompts = await getPrompts();
    set({
      prompts: prompts.filter((prompt) =>
        prompt.question_answers?.every((item) => item.answer && item.question),
      ),
      loading: false,
    });
  },
}));
