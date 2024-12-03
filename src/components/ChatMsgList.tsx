import { Chat } from "@/types";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./ui/chat/chat-bubble";
import { ChatMessageList } from "./ui/chat/chat-message-list";

export function ChatMsgList({ chats }: { chats: Chat[] }) {
  return (
    <ChatMessageList>
      {chats.map(({ id, message_llm, message_user }) => (
        <div
          key={id}
          className="flex flex-col w-full h-full p-4 gap-6 overflow-y-auto"
        >
          <ChatBubble variant="sent">
            <ChatBubbleAvatar fallback="US" />
            <ChatBubbleMessage variant="sent">{message_user}</ChatBubbleMessage>
          </ChatBubble>
          <ChatBubble variant="received">
            <ChatBubbleAvatar fallback="AI" />
            <ChatBubbleMessage variant="received">
              {message_llm}
            </ChatBubbleMessage>
          </ChatBubble>
        </div>
      ))}
    </ChatMessageList>
  );
}
