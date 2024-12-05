import { Alert, Prompt, PromptGroupDateKeys } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { isToday, isYesterday, format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { match } from "ts-pattern";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractTitleFromMessage(message: string) {
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

const groupToDate: Record<PromptGroupDateKeys, Date> = {
  Today: new Date(),
  Yesterday: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  "Previous 7 days": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  "Previous 14 days": new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  "Previous 30 days": new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
};

export function groupPromptsByRelativeDate(prompts: Prompt[]) {
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

    const dateA =
      groupToDate[groupA as PromptGroupDateKeys] || new Date(groupA);
    const dateB =
      groupToDate[groupB as PromptGroupDateKeys] || new Date(groupB);

    return dateB.getTime() - dateA.getTime();
  });

  return Object.fromEntries(sortedGroups);
}

export function getAllIssues(alerts: Alert[]) {
  const groupedTriggerCounts = alerts
    .filter(
      (alert) =>
        alert.trigger_category === "critical" ||
        alert.trigger_category === "info"
    )
    .reduce<Record<string, number>>((acc, alert) => {
      const triggerType = alert.trigger_type;
      if (triggerType) {
        acc[triggerType] = (acc[triggerType] || 0) + 1;
      }
      return acc;
    }, {});

  const maxCount = Math.max(...Object.values(groupedTriggerCounts));

  const sortedTagCounts = Object.entries(groupedTriggerCounts).sort(
    ([, countA], [, countB]) => countB - countA
  );
  return { maxCount, sortedTagCounts };
}

export function getMaliciousPackages() {
  const packageCounts = ([] as { packages: [] }[]).reduce<
    Record<string, number>
  >((acc, prompt) => {
    (prompt?.packages ?? []).forEach((pkg) => {
      acc[pkg] = (acc[pkg] || 0) + 1;
    });
    return acc;
  }, {});

  const chartData = Object.entries(packageCounts).map(([pkg, count]) => ({
    id: pkg,
    label: pkg,
    value: count,
  }));

  return chartData;
}
