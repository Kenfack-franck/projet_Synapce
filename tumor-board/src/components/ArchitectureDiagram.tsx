import type { ReactNode } from "react";

export function ArchitectureDiagram() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.6fr_1fr]">
        <div className="space-y-3">
          <Box title="🏥 PACS" subtitle="Orthanc" />
          <Box title="📋 Dossier" subtitle="Patient" />
          <Box title="📊 Excel" subtitle="Index" />
        </div>

        <div className="space-y-4">
          <DashedZone label="Orchestrateur">
            <Box title="🧠 Hyper-Agent" subtitle="Tumor Board" accent />
            <div className="pt-1 text-center text-xs text-blue-600">MCP ↓</div>
          </DashedZone>

          <DashedZone label="Spécialistes">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <Box title="🫁 Thorax" compact />
              <Box title="🫀 Foie" compact />
              <Box title="🔵 Gang." compact />
              <Box title="🦴 Os" compact />
            </div>
          </DashedZone>

          <DashedZone label="Support">
            <div className="grid grid-cols-3 gap-2">
              <Box title="📚 RAG" compact />
              <Box title="📂 Hist" compact />
              <Box title="✅ Qual" compact />
            </div>
          </DashedZone>
        </div>

        <div className="space-y-3">
          <Box title="🧠 Synthèse" subtitle="RCP" />
          <Box title="📄 Rapports" subtitle="Agents" />
        </div>
      </div>
    </div>
  );
}

function DashedZone({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="relative rounded-lg border-2 border-dashed border-slate-300 p-4">
      <span className="absolute -top-2.5 left-3 bg-white px-2 text-[11px] font-semibold uppercase tracking-[1px] text-slate-400">
        {label}
      </span>
      {children}
    </section>
  );
}

function Box({
  title,
  subtitle,
  accent,
  compact,
}: {
  title: string;
  subtitle?: string;
  accent?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-3 text-center ${
        accent ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
      } ${compact ? "text-xs" : "text-sm"}`}
    >
      <p className="font-medium text-gray-800">{title}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
}
