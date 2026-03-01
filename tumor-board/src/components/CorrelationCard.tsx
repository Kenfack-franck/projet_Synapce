import type { Correlation } from "../data/patients";

const styles: Record<Correlation["type"], string> = {
  alerte: "border-red-500 bg-red-50",
  attention: "border-amber-500 bg-amber-50",
  info: "border-blue-500 bg-blue-50",
};

export function CorrelationCard({ correlation, className = "" }: { correlation: Correlation; className?: string }) {
  return (
    <div className={`rounded-r-lg border-l-4 p-4 ${styles[correlation.type]} ${className}`}>
      <p className="text-sm font-semibold text-slate-800">
        {correlation.icone} {correlation.titre}
      </p>
      <p className="mt-1 text-sm text-slate-600">{correlation.description}</p>
    </div>
  );
}
