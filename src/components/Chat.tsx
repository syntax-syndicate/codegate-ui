import { Chat as ChatType } from "@/types";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./ui/chat/chat-bubble";
import { ChatMessageList } from "./ui/chat/chat-message-list";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";

export function Chat({ chats }: { chats: ChatType[] }) {
  return (
    <div className="h-screen">
      <div className="flex ">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="/">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{chats[0].message_user}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ChatMessageList className="h-[88%]">
        {chats.map(({ id, message_llm, message_user }) => (
          <div key={id} className="flex flex-col w-full h-full p-4 gap-6">
            <ChatBubble variant="sent">
              <ChatBubbleAvatar fallback="User" className="w-14" />
              <ChatBubbleMessage variant="sent">
                {message_user}
              </ChatBubbleMessage>
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
    </div>
  );
}
