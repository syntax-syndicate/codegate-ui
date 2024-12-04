import { MOCKED_ALERTS } from "@/mock/alerts";
import { Prompt } from "../types";
import { Separator } from "./ui/separator";
import { getAllIssues } from "@/lib/utils";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./ui/table";
import { format } from "date-fns";

export function Dashboard({}: { prompts: Prompt[] }) {
  const { maxCount, sortedTagCounts } = getAllIssues(MOCKED_ALERTS);

  return (
    <div className="w-full flex-col">
      <div className="flex justify-around w-full">
        <div className="w-[650px] max-h-[350px]">
          <div className="p-4 border max-h-[350px] border-gray-200 rounded-sm">
            <h2 className="text-lg font-semibold mb-4">Alerts type detected</h2>
            <div className="space-y-3 max-h-[270px] overflow-y-auto px-4 pb-2">
              {sortedTagCounts.map(([tag, count]) => (
                <div key={tag} className="flex items-center space-x-4">
                  <span className="w-1/3 text-sm font-medium text-gray-700 truncate">
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
      </div>

      <Separator className="my-8" />

      <h2 className="font-bold font-lg mb-2">All alerts</h2>
      <div className="w-[calc(100vw-20rem)] h-[500px] px-4 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trigger Type</TableHead>
              <TableHead>Trigger String</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCKED_ALERTS.map((alert) => (
              <TableRow key={alert.alert_id}>
                <TableCell>{alert.trigger_type}</TableCell>
                <TableCell>{alert.trigger_string || "N/A"}</TableCell>
                <TableCell>{alert.code_snippet?.filepath || "N/A"}</TableCell>
                <TableCell>
                  {alert.code_snippet?.code ? (
                    <pre className="whitespace-pre-wrap bg-gray-100 p-2 h-20 overflow-auto text-sm">
                      {alert.code_snippet?.code}
                    </pre>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  <div>{format(new Date(alert.timestamp), "MM/dd/yyyy")}</div>
                  <div>{format(new Date(alert.timestamp), "HH:mm a")}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
