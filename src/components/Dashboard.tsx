import { generateRandomDate, generateRandomUptime } from "../mock/dashboard";
import { Chat, Prompt } from "../types";
import { PieChart } from "../viz/PieChart";
import { ChatMsgList } from "./ChatMsgList";

export function Dashboard({
  prompts,
  chats,
}: {
  chats: Chat[];
  prompts: Prompt[];
}) {
  const tagCounts = prompts.reduce<Record<string, number>>((acc, prompt) => {
    prompt.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(tagCounts));

  const sortedTagCounts = Object.entries(tagCounts).sort(
    ([, countA], [, countB]) => countB - countA
  );

  const packageCounts = prompts.reduce<Record<string, number>>(
    (acc, prompt) => {
      prompt.packages.forEach((pkg) => {
        acc[pkg] = (acc[pkg] || 0) + 1;
      });
      return acc;
    },
    {}
  );

  const chartData = Object.entries(packageCounts).map(([pkg, count]) => ({
    id: pkg,
    label: pkg,
    value: count,
  }));

  return (
    <div className="w-full flex-col">
      <div className="mb-8 flex gap-10">
        <div className="flex gap-2">
          <label className="block font-bold text-sm text-gray-700">
            Uptime:
          </label>
          <p className="text-sm text-gray-600">{generateRandomUptime()}</p>
        </div>

        <div className="flex gap-2">
          <label className="block text-sm font-bold text-gray-700">
            Status:
          </label>
          <p className="text-sm text-gray-600">Operational</p>
        </div>

        <div className="flex gap-2">
          <label className="block text-sm font-bold text-gray-700">
            Version Date:
          </label>
          <p className="text-sm text-gray-600">{generateRandomDate()}</p>
        </div>
      </div>
      <div className="flex py-8 justify-around border-b border-b-gray-200 w-full">
        <div className="w-[450px] h-[350px]">
          <div className="p-4 border h-[350px] border-gray-200 rounded-sm">
            <h2 className="text-lg font-semibold mb-4">
              Malicious issues detected
            </h2>
            <div className="space-y-3 max-h-[270px] overflow-y-auto px-4 pb-2">
              {sortedTagCounts.map(([tag, count]) => (
                <div key={tag} className="flex items-center space-x-4">
                  <span className="w-32 text-sm font-medium text-gray-700 truncate">
                    {tag}
                  </span>
                  <div className="flex-1 h-4 bg-gray-200 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-lg"
                      style={{
                        width: `${(count / maxCount) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[450px] h-[350px]">
          <div className="p-4 border h-full border-gray-200 rounded-sm">
            <h2 className="text-lg font-semibold mb-4">
              Malicious packages detected
            </h2>
            <PieChart
              data={chartData}
              margin={{ top: 30, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={2}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              colors={{ scheme: "pastel2" }}
              borderWidth={1}
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
              }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
              }}
              arcLabelsSkipAngle={1}
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <ChatMsgList chats={chats} />
      </div>
    </div>
  );
}
