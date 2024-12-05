import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BarChart({
  data,
  maxCount,
}: {
  maxCount: number;
  data: [string, number][];
}) {
  if (data.length === 0) {
    return (
      <div className="bg-gray-200 flex items-center justify-center h-20 font-bold text-lg">
        N/A
      </div>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Alerts Type Detected</CardTitle>
        <CardDescription>Security issues blocked</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[270px] overflow-y-auto">
          {data.map(([tag, count]) => (
            <div key={tag} className="flex items-center space-x-4">
              <span className="w-2/4 text-sm font-medium text-gray-700 truncate">
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
              <span className="text-sm font-medium text-gray-700">{count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
