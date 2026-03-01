import type { TimelineEntry } from "../data/patients";

const statusColor: Record<string, string> = {
  progression: "text-red-600",
  stable: "text-gray-600",
  regression: "text-green-600",
  nouveau: "text-red-600",
  normal: "text-gray-400",
  absent: "text-gray-300",
};

const dotColor: Record<string, string> = {
  progression: "bg-red-500",
  stable: "bg-gray-400",
  regression: "bg-green-500",
  nouveau: "bg-red-500",
  normal: "bg-gray-300",
  absent: "bg-gray-200",
};

export function ClinicalTimeline({ timeline }: { timeline: TimelineEntry[] }) {
  return (
    <div className="animate-fade-in-up stagger-2">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Clinical Timeline
      </h3>
      <div className="relative">
        {/* Horizontal line */}
        <div className="absolute top-3 left-0 right-0 h-px bg-gray-200" />

        <div className="flex justify-between relative">
          {timeline.map((entry, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              {/* Dot */}
              <div className="w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
              </div>
              {/* Date + exam */}
              <div className="mt-2 text-center">
                <p className="text-sm font-semibold text-gray-800">{entry.date}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{entry.examen}</p>
              </div>
              {/* Organ summaries */}
              <div className="mt-3 space-y-1 w-full px-1">
                {entry.organes.map((o) => (
                  <div key={o.organe} className="flex items-start gap-1.5">
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor[o.status]}`} />
                    <span className={`text-[11px] leading-tight ${statusColor[o.status]}`}>{o.resume}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
