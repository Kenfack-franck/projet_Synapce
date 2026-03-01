import { useState } from "react";
import type { AgentReport } from "../data/patients";
import { ConfidenceBar } from "./ConfidenceBar";
import { FindingsTable } from "./FindingsTable";
import { StatusBadge } from "./StatusBadge";

const organeLabel: Record<string, string> = {
  poumons: "Poumons",
  foie: "Foie",
  ganglions: "Ganglions",
  os: "Os",
};

const statusLabel: Record<string, string> = {
  progression: "Progressive Disease",
  stable: "Stable Disease",
  regression: "Régression",
  nouveau: "Nouveau",
  normal: "Normal",
};

export function AgentAccordion({ agent }: { agent: AgentReport; index?: number }) {
  const [open, setOpen] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);

  const title = `${agent.icone} ${organeLabel[agent.organe] ?? agent.organe} — ${agent.agent_name}`;
  const metrics = agent.metriques;

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-gray-300">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full cursor-pointer px-5 py-5 text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-[15px] font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{agent.resume_court}</p>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={agent.status} label={statusLabel[agent.status] ?? agent.status} />
              {metrics.vdt && (
                <StatusBadge
                  status={metrics.vdt.alerte ? "attention" : "info"}
                  label={`VDT: ${metrics.vdt.valeur}j${metrics.vdt.alerte ? " ⚠️" : ""}`}
                />
              )}
              {metrics.classification && (
                <StatusBadge color={metrics.classification_color} label={metrics.classification} />
              )}
            </div>
          </div>
          <span className={`mt-1 text-sm text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}>
            ▼
          </span>
        </div>
      </button>

      <div className={`grid transition-all duration-500 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden border-t border-gray-100">
          <div className="space-y-5 px-5 py-5">
            <div>
              <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-400">
                Findings
              </h4>
              <FindingsTable findings={agent.findings} />
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-400">
                Métriques
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {metrics.classification && (
                  <StatusBadge color={metrics.classification_color} label={`RECIST: ${metrics.classification}`} />
                )}
                {metrics.vdt && (
                  <StatusBadge
                    status={metrics.vdt.alerte ? "attention" : "info"}
                    label={`VDT: ${metrics.vdt.valeur}j${metrics.vdt.alerte ? " ⚠️" : ""}`}
                  />
                )}
              </div>
              {metrics.confidence_scores && metrics.confidence_scores.length > 0 && (
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {metrics.confidence_scores.map((score) => (
                    <ConfidenceBar
                      key={`${agent.organe}-${score.finding}`}
                      finding={score.finding}
                      score={score.score}
                      max={score.max}
                    />
                  ))}
                </div>
              )}
              {metrics.donnees_manquantes && metrics.donnees_manquantes.length > 0 && (
                <p className="mt-3 text-xs text-gray-500">
                  Données manquantes : {metrics.donnees_manquantes.join(" · ")}
                </p>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => setShowFullReport((prev) => !prev)}
                className="cursor-pointer text-xs font-medium text-gray-500 transition-colors hover:text-blue-600"
              >
                Voir le rapport complet {showFullReport ? "▲" : "▼"}
              </button>

              {showFullReport && (
                <div className="mt-3 rounded-lg bg-gray-50 p-5">
                  {agent.rapport.map((section) => (
                    <section key={`${agent.organe}-${section.titre}`} className="mt-3 first:mt-0">
                      <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {section.titre}
                      </h5>
                      <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                        {section.contenu}
                      </p>
                    </section>
                  ))}
                </div>
              )}
            </div>

            {metrics.verification && (
              <div className="border-t border-gray-100 pt-4 text-xs text-gray-500">
                ✅ {metrics.verification.verifiees} mesures vérifiées · 🔄 {metrics.verification.corrigees} corrigée
                {metrics.verification.corrigees > 1 ? "s" : ""} · ❌ {metrics.verification.non_resolues} non résolue
                {metrics.verification.non_resolues > 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
