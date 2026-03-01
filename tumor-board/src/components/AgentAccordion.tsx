import { useState } from "react";
import type { AgentReport } from "../data/patients";
import { StatusBadge } from "./StatusBadge";
import { FindingsTable } from "./FindingsTable";
import { ConfidenceBar } from "./ConfidenceBar";

const statusLabels: Record<string, string> = {
  progression: "Progression",
  stable: "Stable",
  regression: "Régression",
  nouveau: "Nouveau",
  normal: "Normal",
};

export function AgentAccordion({ agent, index }: { agent: AgentReport; index: number }) {
  const [open, setOpen] = useState(false);
  const m = agent.metriques;

  return (
    <div
      className={`border border-gray-200 rounded-lg overflow-hidden bg-white animate-fade-in-up stagger-${index + 3}`}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-start justify-between hover:bg-gray-50/50 transition-colors cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{agent.icone}</span>
            <span className="font-semibold text-gray-800 text-[0.95rem]">
              {agent.organe.charAt(0).toUpperCase() + agent.organe.slice(1)}
            </span>
            <span className="text-xs text-gray-400">— {agent.agent_name}</span>
          </div>
          <p className="text-sm text-gray-500 leading-snug">{agent.resume_court}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <StatusBadge status={agent.status} label={statusLabels[agent.status] || agent.status} />
            {m.classification && (
              <StatusBadge color={m.classification_color} label={m.classification} />
            )}
            {m.vdt && m.vdt.alerte && (
              <span className="text-xs text-red-600 font-medium">
                VDT: {m.vdt.valeur}j ⚠️
              </span>
            )}
            <span className="text-xs text-gray-400 ml-auto">{agent.standard_medical}</span>
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`text-gray-400 ml-3 mt-1 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
        >
          <path d="M5 8l5 4 5-4" />
        </svg>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="border-t border-gray-100 px-5 py-4 space-y-5">
          {/* Findings */}
          {agent.findings.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Findings ({agent.findings.length})
              </h4>
              <FindingsTable findings={agent.findings} />
            </div>
          )}

          {/* Confidence scores */}
          {m.confidence_scores && m.confidence_scores.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Scores de confiance
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {m.confidence_scores.map((cs) => (
                  <ConfidenceBar key={cs.finding} {...cs} />
                ))}
              </div>
            </div>
          )}

          {/* VDT detail */}
          {m.vdt && (
            <div className={`text-sm p-3 rounded-lg ${m.vdt.alerte ? "bg-red-50 border border-red-100" : "bg-gray-50"}`}>
              <span className="font-medium text-gray-700">Volume Doubling Time : </span>
              <span className="font-mono font-medium">{m.vdt.valeur} jours</span>
              <p className="text-xs text-gray-500 mt-1">{m.vdt.interpretation}</p>
            </div>
          )}

          {/* Full report */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Rapport complet
            </h4>
            <div className="space-y-3">
              {agent.rapport.map((section) => (
                <div key={section.titre}>
                  <h5 className="text-xs font-semibold text-gray-600 mb-1">{section.titre}</h5>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {section.contenu}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Verification + missing data */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
            {m.verification && (
              <div className="flex items-center gap-3">
                <span>✅ {m.verification.verifiees} vérifiées</span>
                {m.verification.corrigees > 0 && (
                  <span>🔄 {m.verification.corrigees} corrigée{m.verification.corrigees > 1 ? "s" : ""}</span>
                )}
                {m.verification.non_resolues > 0 && (
                  <span>❌ {m.verification.non_resolues} non résolue{m.verification.non_resolues > 1 ? "s" : ""}</span>
                )}
              </div>
            )}
          </div>
          {m.donnees_manquantes && m.donnees_manquantes.length > 0 && (
            <div className="text-xs text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
              <span className="font-medium">Données manquantes :</span>{" "}
              {m.donnees_manquantes.join(" · ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
