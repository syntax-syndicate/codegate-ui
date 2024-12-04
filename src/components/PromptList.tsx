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
          <h2 className="font-bold text-sm text-gray-700 mb-2">{group}</h2>
          <ul className="space-y-2">
            {prompts.map((prompt) => (
              <li
                key={prompt.chat_id}
                className="flex items-center p-2 bg-white rounded-md shadow-sm border border-gray-200"
              >
                <Link to={`/prompt/${prompt.chat_id}`}>
                  <p className="font-medium text-gray-800 text-sm line-clamp-1">
                    {extractTitleFromMessage(
                      prompt.question_answers?.[0].question.message ?? ""
                    )}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
