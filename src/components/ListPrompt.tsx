export function ListPrompt() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 10 }, (_, i) => (
        <div className="line-clamp-1" key={i}>
          Prompt {i + 1}
        </div>
      ))}
    </div>
  );
}
