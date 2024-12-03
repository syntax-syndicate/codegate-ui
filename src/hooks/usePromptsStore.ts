import { create } from "zustand";
import { Prompt } from "../types";
import { MOCKED_PROMPTS } from "@/mock/prompts";

type PromptState = {
  prompts: Prompt[];
  fetchPrompts: () => void;
};

export const usePromptsStore = create<PromptState>((set) => ({
  prompts: [],
  fetchPrompts: () => {
    set({ prompts: MOCKED_PROMPTS });
  },
}));
