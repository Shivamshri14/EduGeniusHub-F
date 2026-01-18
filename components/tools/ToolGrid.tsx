import { Tool } from "@/lib/catalog";
import ToolCard from "./ToolCard";

interface ToolGridProps {
  tools: Tool[];
  emptyMessage?: string;
}

export default function ToolGrid({
  tools,
  emptyMessage = "No tools found",
}: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
