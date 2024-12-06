export type PromptState = {
  prompts: Prompt[];
  loading: boolean;
  fetchPrompts: () => void;
};

export type AlertState = {
  alerts: Alert[];
  loading: boolean;
  fetchAlerts: () => void;
};

export type TriggerType =
  | "codegate-version"
  | "codegate-context-retriever"
  | "codegate-system-prompt"
  | "code-snippet-extractor"
  | "codegate-secrets"
  | string;

export type SystemType = {
  provider: string;
  type: string;
  chat_id: string;
  conversation_timestamp: string;
};

export type CodeSnippet = {
  language: string | null;
  filepath: string;
  code: string;
};

export type Prompt = SystemType & {
  // ---- temp
  packages?: string[];
  tags?: string[];
  // -----
  question_answers?: Chat[];
};

export type Alert = {
  conversation: {
    question_answers: Chat[];
  } & SystemType;
  alert_id: string;
  code_snippet: CodeSnippet | null;
  trigger_string: string | null;
  trigger_type: TriggerType;
  trigger_category: "info" | "critical";
  timestamp: string;
};

export type Chat = {
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
};
