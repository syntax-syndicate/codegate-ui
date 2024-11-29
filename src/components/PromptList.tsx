import { isToday, isYesterday, format } from "date-fns";
import { match } from "ts-pattern";

type Prompt = {
  text: string;
  date: string;
  tags: string[];
  packages: string[];
};

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

const promptsMocked: Prompt[] = [
  {
    text: "Analyze the given log file for potential security breaches.",
    date: "2024-11-29T08:00:00Z",
    tags: ["security"],
    packages: ["date-fns", "log-parser"],
  },
  {
    text: "Analyze the given log file for potential security breaches.",
    date: "2024-11-28T08:00:00Z",
    tags: ["security", "log-analysis"],
    packages: ["log-parser"],
  },
  {
    text: "Analyze the given log file for potential security breaches.",
    date: "2024-11-22T08:00:00Z",
    tags: ["security", "log-analysis"],
    packages: ["log-parser"],
  },
  {
    text: "Identify sensitive information (e.g., passwords, API keys) in the provided configuration file.",
    date: "2024-11-17T11:45:00Z",
    tags: ["security", "sensitive-data"],
    packages: ["openai", "config-parser"],
  },
  {
    text: "Generate a report for the vulnerabilities detected in the provided dependency file.",
    date: "2024-11-04T14:30:00Z",
    tags: ["security", "vulnerability-scanning"],
    packages: ["dependency-check"],
  },
  {
    text: "Evaluate network traffic logs for signs of intrusion.",
    date: "2024-11-26T10:00:00Z",
    tags: ["network", "intrusion-detection"],
    packages: ["suricata", "wireshark"],
  },
  {
    text: "Check firewall configuration for misconfigurations or vulnerabilities.",
    date: "2024-11-25T09:30:00Z",
    tags: ["firewall", "configuration"],
    packages: ["nmap", "firewalld"],
  },
  {
    text: "Perform a security audit of uploaded files for malware detection.",
    date: "2024-11-20T15:15:00Z",
    tags: ["malware-detection", "security-audit"],
    packages: ["clamav", "yara"],
  },
  {
    text: "Generate recommendations for improving endpoint security.",
    date: "2024-11-18T14:45:00Z",
    tags: ["endpoint-security", "recommendations"],
    packages: ["crowdstrike", "sentinelone"],
  },
  {
    text: "Scan database queries for SQL injection vulnerabilities.",
    date: "2024-10-10T12:30:00Z",
    tags: ["database", "sql-injection"],
    packages: ["sqlmap"],
  },
];

function groupPromptsByRelativeDate(prompts: Prompt[]) {
  const grouped = prompts.reduce((groups, prompt) => {
    const promptDate = new Date(prompt.date);

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

export function PromptList() {
  const groupedPrompts = groupPromptsByRelativeDate(promptsMocked);
  return (
    <div className="p-2 rounded-lg h-[calc(100%-40px)] overflow-y-auto">
      {Object.entries(groupedPrompts).map(([group, prompts]) => (
        <div key={group} className="mb-3">
          <h2 className="font-bold text-sm text-gray-700 mt-1 mb-2">{group}</h2>
          <ul className="space-y-2">
            {prompts.map((prompt, index) => (
              <li
                key={index}
                className="p-2 bg-white rounded-md shadow-sm border border-gray-200"
              >
                <h3 className="font-medium text-gray-800 mb-1 text-sm line-clamp-1">
                  {prompt.text}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {prompt.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-yellow-100 text-yellow-700 text-[10px] font-medium px-1 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {prompt.packages.map((pkg) => (
                    <span
                      key={pkg}
                      className="inline-block bg-blue-100 text-blue-700 text-[10px] font-medium px-1 py-0.5 rounded-full"
                    >
                      {pkg}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
