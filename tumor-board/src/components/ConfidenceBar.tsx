export function ConfidenceBar({ finding, score, max }: { finding: string; score: number; max: number }) {
  const pct = (score / max) * 100;
  const color = pct >= 87.5 ? "bg-green-500" : pct >= 62.5 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="font-mono text-gray-500 w-6">{finding}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-20">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="font-mono text-gray-500">
        {score}/{max}
      </span>
    </div>
  );
}
