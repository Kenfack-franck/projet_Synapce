export function ConfidenceBar({ finding, score, max }: { finding: string; score: number; max: number }) {
  const pct = (score / max) * 100;
  const color = pct >= 87.5 ? "bg-green-500" : pct >= 62.5 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-6 font-mono text-slate-500">{finding}</span>
      <div className="h-1.5 max-w-28 flex-1 overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="font-mono text-slate-500">
        {score}/{max}
      </span>
    </div>
  );
}
