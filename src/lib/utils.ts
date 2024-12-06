import { Alert, Prompt } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { isToday, isYesterday } from "date-fns";
import { twMerge } from "tailwind-merge";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * ONE_DAY_MS;
const TEEN_DAYS_MS = 14 * ONE_DAY_MS;
const THTY_DAYS_MS = 30 * ONE_DAY_MS;

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

function getGroup(differenceInMs: number, promptDate: Date): string {
  if (isToday(promptDate)) {
    return "Today";
  }
  if (isYesterday(promptDate)) {
    return "Yesterday";
  }
  if (differenceInMs <= SEVEN_DAYS_MS) {
    return "Previous 7 days";
  }
  if (differenceInMs <= TEEN_DAYS_MS) {
    return "Previous 14 days";
  }
  if (differenceInMs <= THTY_DAYS_MS) {
    return "Previous 30 days";
  }
  return "Beyond 30 days";
}

export function groupPromptsByRelativeDate(prompts: Prompt[]) {
  const grouped = prompts.reduce((groups, prompt) => {
    const promptDate = new Date(prompt.conversation_timestamp);
    const now = new Date();
    const differenceInMs = now.getTime() - promptDate.getTime();
    const group = getGroup(differenceInMs, promptDate);

    if (!groups[group]) {
      groups[group] = [];
    }

    groups[group].push(prompt);
    return groups;
  }, {} as Record<string, Prompt[]>);

  return grouped;
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
