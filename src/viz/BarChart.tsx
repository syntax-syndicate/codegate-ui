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
    <div className="space-y-3 max-h-[270px] overflow-y-auto px-4 pb-2">
      {data.map(([tag, count]) => (
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
          <span className="text-sm font-medium text-gray-700">{count}</span>
        </div>
      ))}
    </div>
  );
}
