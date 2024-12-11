export type PromptState = {
  prompts: Prompt[];
  loading: boolean;
  fetchPrompts: () => void;
};

export type AlertState = {
  alerts: Alert[];
  filteredAlerts: Alert[];
  loading: boolean;
  isMaliciousFilterActive: boolean;
  search: string;
  setSearch: (search: string) => void;
  getMaliciousPackagesChart: () => MaliciousPkgType[];
  updateFilteredAlerts: () => void;
  toggleMaliciousFilter: (isChecked: boolean) => void;
  fetchAlerts: () => void;
};

export type TriggerType =
  | "codegate-version"
  | "codegate-context-retriever"
  | "system-prompt"
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
  question_answers?: Chat[];
};

export type MaliciousPkgType = {
  name: string;
  type: string;
  status: string;
  description: string;
};

export type Alert = {
  conversation: {
    question_answers: Chat[];
  } & SystemType;
  alert_id: string;
  code_snippet: CodeSnippet | null;
  trigger_string: string | MaliciousPkgType | null;
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
