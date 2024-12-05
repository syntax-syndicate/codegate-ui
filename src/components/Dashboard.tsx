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
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { BarChart } from "@/viz/BarChart";
import { LineChart } from "@/viz/LineChart";
import { useAlertsStore } from "@/hooks/useAlertsStore";
import { Markdown } from "./Markdown";

const wrapObjectOutput = (input: string) => {
  const isObject = /\{"/.test(input);
  console.log("input", input);
  if (isObject) {
    return (
      <pre className="max-h-40 h-40 overflow-y-auto whitespace-pre-wrap bg-gray-100 p-2">
        <code>{input}</code>
      </pre>
    );
  }
  return <Markdown className="max-w-80">{input || "N/A"}</Markdown>;
};

export function Dashboard() {
  const { alerts, loading, fetchAlerts } = useAlertsStore();

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const { maxCount, sortedTagCounts } = getAllIssues(alerts);
  const [search, setSearch] = useState("");
  const filteredAlerts = search
    ? alerts
        .filter(
          (alert) =>
            alert.trigger_string?.toLowerCase().includes(search) ||
            alert.trigger_type?.toLowerCase().includes(search)
        )
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
    : alerts.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

  return (
    <div className="flex-col h-[calc(100vh-6rem)] my-auto overflow-auto">
      <div className="flex flex-wrap items-center gap-4 w-full">
        <div className="w-1/4 h-[240px]">
          <BarChart
            data={sortedTagCounts}
            maxCount={maxCount}
            loading={loading}
          />
        </div>
        <div className="relative w-1/4 h-[240px]">
          <LineChart alerts={alerts} loading={loading} />
        </div>
      </div>

      <Separator className="my-8" />

      <div className="flex mb-2 mx-2 justify-between w-[calc(100vw-20rem)]">
        <div className="flex gap-2 items-center">
          <h2 className="font-bold font-lg">All Alerts</h2>
          <Badge>{filteredAlerts.length}</Badge>
        </div>
        <Input
          icon={
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L17.5001 17.5M20 11.5C20 16.1944 16.1944 20 11.5 20C6.80558 20 3 16.1944 3 11.5C3 6.80558 6.80558 3 11.5 3C16.1944 3 20 6.80558 20 11.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
        />
      </div>
      <div className="w-[calc(100vw-18rem)] px-4 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[100px]">Trigger Type</TableHead>
              <TableHead className="w-1/3 max-w-80">Trigger Token</TableHead>
              <TableHead className="max-w-[100px]">File</TableHead>
              <TableHead className="w-1/3 max-w-80">Code</TableHead>
              <TableHead className="max-w-[100px]">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.map((alert) => (
              <TableRow key={alert.alert_id} className="max-h-20">
                <TableCell className="max-w-[100px] truncate">
                  {alert.trigger_type}
                </TableCell>
                <TableCell className="w-1/3 max-w-80">
                  {wrapObjectOutput(alert.trigger_string ?? "")}
                </TableCell>
                <TableCell className="max-w-[100px] truncate">
                  {alert.code_snippet?.filepath || "N/A"}
                </TableCell>
                <TableCell className="w-1/3 max-w-80">
                  {alert.code_snippet?.code ? (
                    <pre className="max-h-40 overflow-y-auto bg-gray-100 p-2 whitespace-pre-wrap">
                      <code>{alert.code_snippet?.code}</code>
                    </pre>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell className="max-w-[100px] truncate">
                  <div>
                    {format(new Date(alert.timestamp ?? ""), "y/MM/dd")}
                  </div>
                  <div>
                    {format(new Date(alert.timestamp ?? ""), "HH:mm a")}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
