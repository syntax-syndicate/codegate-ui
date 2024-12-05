import { MOCKED_ALERTS } from "@/mock/alerts";
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
import { useState } from "react";
import { BarChart } from "@/viz/BarChart";
import { LineChart } from "@/viz/LineChart";

export function Dashboard() {
  const { maxCount, sortedTagCounts } = getAllIssues(MOCKED_ALERTS);
  const [search, setSearch] = useState("");
  const alerts = search
    ? MOCKED_ALERTS.filter(
        (alert) =>
          alert.trigger_string?.toLowerCase().includes(search) ||
          alert.trigger_type?.toLowerCase().includes(search)
      ).sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    : MOCKED_ALERTS.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

  return (
    <div className="flex-col h-[calc(100vh-6rem)] my-auto overflow-auto">
      <div className="flex flex-wrap items-center gap-4 w-full">
        <div className="w-[450px] h-[240px]">
          <BarChart data={sortedTagCounts} maxCount={maxCount} />
        </div>
        <div className="relative w-[300px] h-[240px]">
          <LineChart alerts={MOCKED_ALERTS} />
        </div>
      </div>

      <Separator className="my-8" />

      <div className="flex mb-2 mx-2 justify-between w-[calc(100vw-20rem)]">
        <div className="flex gap-2 items-center">
          <h2 className="font-bold font-lg">All Alerts</h2>
          <Badge>{alerts.length}</Badge>
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
              <TableHead>Trigger Type</TableHead>
              <TableHead>Trigger Token</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
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
                  <div>{format(new Date(alert.timestamp), "y/MM/dd")}</div>
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
