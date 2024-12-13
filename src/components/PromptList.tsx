import { Prompt } from "../types";
import { Link } from "react-router-dom";
import {
  extractTitleFromMessage,
  groupPromptsByRelativeDate,
} from "@/lib/utils";

export function PromptList({ prompts }: { prompts: Prompt[] }) {
  const groupedPrompts = groupPromptsByRelativeDate(prompts);
  return (
    <div className="mx-2">
      {Object.entries(groupedPrompts).map(([group, prompts]) => (
        <div key={group} className="mb-3">
          <h2 className="font-bold text-sm text-gray-700 mb-2 mt-6">{group}</h2>
          <ul className="space-y-2">
            {prompts.map((prompt) => (
              <li key={prompt.chat_id} className="flex items-center p-1 w-full">
                <Link
                  to={`/prompt/${prompt.chat_id}`}
                  className="text-gray-800 text-sm truncate hover:text-gray-500"
                >
                  {extractTitleFromMessage(
                    prompt.question_answers?.[0].question.message ??
                      `Prompt ${prompt.conversation_timestamp}`
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
