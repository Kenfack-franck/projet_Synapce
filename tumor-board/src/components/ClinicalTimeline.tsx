import type { TimelineEntry } from "../data/patients";

const organIcons: Record<string, string> = {
  poumons: "🫁",
  foie: "🫀",
  ganglions: "🔵",
  os: "🦴",
};

const statusColor: Record<string, string> = {
  progression: "text-red-600",
  stable: "text-gray-600",
  regression: "text-green-600",
  nouveau: "text-blue-700",
  normal: "text-gray-400",
  absent: "text-gray-300",
};

export function ClinicalTimeline({ timeline }: { timeline: TimelineEntry[] }) {
  return (
    <div className="rounded-xl bg-gray-50 p-6">
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-400">
        Clinical Timeline
      </h3>
      <div className="relative mb-6">
        <div className="absolute left-0 right-0 top-2.5 h-px bg-gray-300" />

        <div className="relative grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {timeline.map((entry) => (
            <div key={`${entry.date}-${entry.examen}`} className="text-center">
              <div className="mx-auto mb-2 h-5 w-5 rounded-full border-2 border-blue-500 bg-white" />
              <p className="text-sm font-semibold text-gray-800">{entry.date}</p>
              <p className="text-[11px] text-gray-500">{entry.examen}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {timeline.map((entry) => (
          <div key={`summary-${entry.date}-${entry.examen}`} className="space-y-2 rounded-lg bg-white p-4">
            {entry.organes.map((organe) => (
              <div key={`${entry.date}-${organe.organe}`} className="text-xs leading-snug">
                <span className="mr-1">{organIcons[organe.organe] ?? "•"}</span>
                <span className={statusColor[organe.status]}>{organe.resume}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
