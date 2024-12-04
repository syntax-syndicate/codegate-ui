import { isToday, isYesterday, format } from "date-fns";
import { match } from "ts-pattern";
import { Prompt } from "../types";
import { Link } from "react-router-dom";

type GroupKeys =
  | "Today"
  | "Yesterday"
  | "Previous 7 days"
  | "Previous 14 days"
  | "Previous 30 days";

const groupToDate: Record<GroupKeys, Date> = {
  Today: new Date(),
  Yesterday: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  "Previous 7 days": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  "Previous 14 days": new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  "Previous 30 days": new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
};

function extractTitleFromMessage(message: string) {
  const regex = /^(.*)```[\s\S]*?```(.*)$/s;
  const match = message.match(regex);

  if (match) {
    const beforeMarkdown = match[1].trim();
    const afterMarkdown = match[2].trim();

    const title = beforeMarkdown || afterMarkdown;
    return title;
  }

  return message.trim();
}

function groupPromptsByRelativeDate(prompts: Prompt[]) {
  const grouped = prompts.reduce((groups, prompt) => {
    const promptDate = new Date(prompt.conversation_timestamp);

    const now = new Date();
    const differenceInMs = now.getTime() - promptDate.getTime();

    const group = match(true)
      .when(
        () => isToday(promptDate),
        () => "Today"
      )
      .when(
        () => isYesterday(promptDate),
        () => "Yesterday"
      )
      .when(
        () =>
          differenceInMs <= 7 * 24 * 60 * 60 * 1000 &&
          differenceInMs > 1 * 24 * 60 * 60 * 1000,
        () => "Previous 7 days"
      )
      .when(
        () =>
          differenceInMs <= 14 * 24 * 60 * 60 * 1000 &&
          differenceInMs > 7 * 24 * 60 * 60 * 1000,
        () => "Previous 14 days"
      )
      .when(
        () =>
          differenceInMs <= 30 * 24 * 60 * 60 * 1000 &&
          differenceInMs > 14 * 24 * 60 * 60 * 1000,
        () => "Previous 30 days"
      )
      .when(
        () => differenceInMs > 30 * 24 * 60 * 60 * 1000,
        () => "Beyond 30 days"
      )
      .otherwise(() => format(promptDate, "yyyy-MM-dd"));

    if (!groups[group]) {
      groups[group] = [];
    }

    groups[group].push(prompt);
    return groups;
  }, {} as Record<string, Prompt[]>);

  const sortedGroups = Object.entries(grouped).sort(([groupA], [groupB]) => {
    if (groupA === "Beyond 30 days") return 1;
    if (groupB === "Beyond 30 days") return -1;

    const dateA = groupToDate[groupA as GroupKeys] || new Date(groupA);
    const dateB = groupToDate[groupB as GroupKeys] || new Date(groupB);

    return dateB.getTime() - dateA.getTime();
  });

  return Object.fromEntries(sortedGroups);
}

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
