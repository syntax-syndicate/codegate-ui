import { Separator } from "./ui/separator";
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
import { useEffect } from "react";
import { BarChart } from "@/viz/BarChart";
import { LineChart } from "@/viz/LineChart";
import { useAlertsStore } from "@/hooks/useAlertsStore";
import { Markdown } from "./Markdown";
import { MaliciousPkgType } from "@/types";
import { PieChart } from "@/viz/PieChart";
import { Switch } from "./ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const wrapObjectOutput = (input: string | MaliciousPkgType | null) => {
  if (typeof input === "object" && input !== null) {
    return (
      <div className="max-h-40 w-fit overflow-y-auto whitespace-pre-wrap  p-2">
        <label className="font-medium">Package:</label> {input.type}/
        {input.name}
        <br />
        <label className="font-medium">Description:</label> {input.description}
      </div>
    );
  }

  if (input === null) {
    return "N/A";
  }

  const isObject = /\{"/.test(input);
  if (isObject) {
    return (
      <pre className="max-h-40 overflow-y-auto whitespace-pre-wrap bg-gray-100 p-2">
        <code>{input}</code>
      </pre>
    );
  }
  return (
    <Markdown className="bg-gray-100 overflow-auto w-fit p-1">{input}</Markdown>
  );
};

export function Dashboard() {
  const {
    alerts,
    loading,
    fetchAlerts,
    filteredAlerts,
    getMaliciousPackagesChart,
    isMaliciousFilterActive,
    toggleMaliciousFilter,
    setSearch,
  } = useAlertsStore();

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const maliciousPackages = getMaliciousPackagesChart();

  return (
    <div className="flex-col h-[calc(100vh-6rem)] my-auto overflow-auto">
      <div className="flex flex-wrap items-center gap-4 w-full">
        <div className="min-w-80 w-1/4 h-60">
          <BarChart data={alerts} loading={loading} />
        </div>
        <div className="min-w-80 w-1/4 h-60">
          <PieChart data={maliciousPackages} loading={loading} />
        </div>
        <div className="relative w-[370px] h-60">
          <LineChart data={alerts} loading={loading} />
        </div>
      </div>

      <Separator className="my-8" />

      <div className="flex mb-2 mx-2 justify-between w-[calc(100vw-20rem)]">
        <div className="flex gap-2 items-center">
          <h2 className="font-bold font-lg">All Alerts</h2>
          <Badge>{filteredAlerts.length}</Badge>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="airplane-mode"
                      checked={isMaliciousFilterActive}
                      onCheckedChange={toggleMaliciousFilter}
                    />
                    <label htmlFor="airplane-mode" className="text-sm">
                      Malicious Packages
                    </label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter by malicious packages</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Trigger Type</TableHead>
              <TableHead className="w-[300px]">Trigger Token</TableHead>
              <TableHead className="w-[150px]">File</TableHead>
              <TableHead className="w-[300px]">Code</TableHead>
              <TableHead className="w-[150px]">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.map((alert) => (
              <TableRow key={alert.alert_id} className="h-20">
                <TableCell className="truncate">{alert.trigger_type}</TableCell>
                <TableCell className="overflow-auto whitespace-nowrap">
                  {wrapObjectOutput(alert.trigger_string)}
                </TableCell>
                <TableCell className="truncate">
                  {alert.code_snippet?.filepath || "N/A"}
                </TableCell>
                <TableCell className="overflow-auto whitespace-nowrap">
                  {alert.code_snippet?.code ? (
                    <pre className="max-h-40 overflow-auto bg-gray-100 p-2 whitespace-pre-wrap">
                      <code>{alert.code_snippet.code}</code>
                    </pre>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell className="truncate">
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
