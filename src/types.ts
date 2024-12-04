export type PromptState = {
  prompts: Prompt[];
  fetchPrompts: () => void;
};

export type Prompt = {
  provider: string;
  type: string;
  chat_id: string;
  // ---- temp
  packages?: string[];
  tags?: string[];
  // -----
  conversation_timestamp: string;
  question_answers?: {
    question: {
      message: string;
      timestamp: string;
      message_id: string;
    };
    answer: {
      message: string;
      timestamp: string;
      message_id: string;
    };
  }[];
};

export type Chat = {
  id: string;
  message_user: string;
  message_llm: string;
};
