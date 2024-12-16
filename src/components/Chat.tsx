import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./ui/chat/chat-bubble";
import { ChatMessageList } from "./ui/chat/chat-message-list";
import { useParams } from "react-router-dom";
import { usePromptsStore } from "@/hooks/usePromptsStore";
import { Markdown } from "./Markdown";

export function Chat() {
  const { id } = useParams();
  const chat = usePromptsStore((state) =>
    state.prompts.find((prompt) => prompt.chat_id === id)
  );

  return (
    <div className="w-[calc(100vw-18rem)]">
      <ChatMessageList>
        {(chat?.question_answers ?? []).map(({ question, answer }, index) => (
          <div key={index} className="flex flex-col w-full h-full p-4 gap-6">
            <ChatBubble variant="sent">
              <ChatBubbleAvatar fallback="User" className="w-14" />
              <ChatBubbleMessage variant="sent" className="bg-zinc-700">
                <Markdown className="text-gray-300">
                  {question?.message}
                </Markdown>
              </ChatBubbleMessage>
            </ChatBubble>
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage variant="received">
                <Markdown>{answer?.message}</Markdown>
              </ChatBubbleMessage>
            </ChatBubble>
          </div>
        ))}
      </ChatMessageList>
    </div>
  );
}
