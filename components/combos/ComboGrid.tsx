import { ComboTool } from "@/lib/catalog";
import ComboCard from "./ComboCard";

interface ComboGridProps {
  combos: ComboTool[];
}

export default function ComboGrid({ combos }: ComboGridProps) {
  if (combos.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {combos.map((combo) => (
        <ComboCard key={combo.id} combo={combo} />
      ))}
    </div>
  );
}
