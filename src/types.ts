export type Prompt = {
  id: string;
  text: string;
  date: string;
  tags: string[];
  packages: string[];
  conversations?: { q: string; a: string }[];
};


export type Chat = {
  id: string;
  message_user: string;
  message_llm: string
}

[
  {
    "request_id": "29467c60-bc6a-41cb-9154-7d3a08e9838c",
    "output_id": "aacf152d-207a-4d8e-bef5-c23d69f777e3",
    "request_timestamp": "2024-12-03T15:14:21.447062Z",
    "output_timestamp": "2024-12-03T15:14:28.506694Z",
    "request_message": "hello",
    "output_message": "Hi! How can I help you today?",
    "provider": "anthropic",
    "type": "chat"
  }
]