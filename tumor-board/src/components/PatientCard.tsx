import { useNavigate } from "react-router-dom";
import type { Patient } from "../data/patients";
import { StatusBadge } from "./StatusBadge";

const urgencyDot: Record<string, string> = {
  critique: "bg-red-500",
  attention: "bg-amber-500",
  stable: "bg-green-500",
};

const organeIcons: Record<string, string> = {
  poumons: "🫁",
  foie: "🟤",
  ganglions: "🟣",
  os: "🦴",
};

export function PatientCard({ patient }: { patient: Patient }) {
  const navigate = useNavigate();
  const synth = patient.synthese_tumor_board;

  // Determine which organs have active findings (not normal)
  const activeOrgans = patient.agents.filter((a) => a.status !== "normal");

  // Get last exam date from timeline
  const lastExam = patient.timeline[patient.timeline.length - 1];

  return (
    <div
      onClick={() => navigate(`/patient/${patient.id}`)}
      className="border border-gray-200 rounded-lg p-5 bg-white hover:bg-gray-50/50 hover:border-gray-300 transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        {/* Urgency dot */}
        <div className="pt-1.5">
          <div className={`w-3 h-3 rounded-full ${urgencyDot[patient.urgence]}`} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Patient ID + demographics */}
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="font-semibold text-gray-800">Patient {patient.id}</h3>
            <span className="text-sm text-gray-400">
              {patient.age} ans · {patient.sexe}
            </span>
          </div>

          {/* Diagnostic */}
          <p className="text-sm text-gray-600 mb-2">{patient.diagnostic_principal}</p>

          {/* Exam info */}
          <p className="text-xs text-gray-400 mb-3">
            {patient.nombre_examens} examen{patient.nombre_examens > 1 ? "s" : ""} · Dernière
            imagerie : {lastExam?.date || "—"}
          </p>

          {/* Organ badges */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {activeOrgans.map((agent) => (
              <span
                key={agent.organe}
                className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full"
              >
                {organeIcons[agent.organe] || "●"}{" "}
                {agent.organe.charAt(0).toUpperCase() + agent.organe.slice(1)}
              </span>
            ))}
          </div>

          {/* Evaluation badge */}
          <div className="flex items-center gap-3">
            <StatusBadge
              color={synth.evaluation_color}
              label={synth.evaluation_globale.split("—")[0].trim()}
            />
          </div>

          {/* Summary */}
          <p className="text-sm text-gray-500 mt-2 leading-snug">{patient.resume_worklist}</p>
        </div>

        {/* Arrow */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-gray-300 group-hover:text-gray-500 transition-colors mt-1 flex-shrink-0"
        >
          <path d="M8 4l6 6-6 6" />
        </svg>
      </div>
    </div>
  );
}
