import type { TumorBoardSynthesis as TBSynthesis } from "../data/patients";
import { StatusBadge } from "./StatusBadge";
import { TypewriterText } from "./TypewriterText";

const corrTypeStyle: Record<string, { bg: string; border: string }> = {
  alerte: { bg: "bg-red-50", border: "border-red-100" },
  attention: { bg: "bg-amber-50", border: "border-amber-100" },
  info: { bg: "bg-blue-50", border: "border-blue-100" },
};

export function TumorBoardSynthesisView({ synthese }: { synthese: TBSynthesis }) {
  return (
    <div className="animate-fade-in-up stagger-7">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Synthèse Tumor Board
      </h3>

      <div className="border border-gray-200 rounded-lg bg-white p-5 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <div>
            <h4 className="font-semibold text-gray-800">Hyper-Agent Tumor Board</h4>
            <p className="text-xs text-gray-400">Synthèse inter-organes automatisée</p>
          </div>
        </div>

        {/* Global evaluation */}
        <div
          className={`rounded-lg p-4 text-center ${
            synthese.evaluation_color === "red"
              ? "bg-red-50 border border-red-200"
              : synthese.evaluation_color === "green"
              ? "bg-green-50 border border-green-200"
              : "bg-amber-50 border border-amber-200"
          }`}
        >
          <StatusBadge
            color={synthese.evaluation_color}
            label={synthese.evaluation_globale}
            size="lg"
          />
        </div>

        {/* Correlations */}
        <div>
          <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Corrélations détectées
          </h5>
          <div className="space-y-3">
            {synthese.correlations.map((corr, i) => {
              const style = corrTypeStyle[corr.type] || corrTypeStyle.info;
              return (
                <div key={i} className={`p-3 rounded-lg border ${style.bg} ${style.border}`}>
                  <div className="flex items-start gap-2">
                    <span className="text-sm mt-0.5">{corr.icone}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{corr.titre}</p>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{corr.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Discussion points */}
        <div>
          <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Points de discussion RCP
          </h5>
          <ol className="space-y-2">
            {synthese.points_discussion.map((pt, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-xs font-mono text-gray-400 mt-0.5 flex-shrink-0">{i + 1}.</span>
                {pt}
              </li>
            ))}
          </ol>
        </div>

        {/* Recommandations */}
        <div>
          <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Recommandations
          </h5>
          <ul className="space-y-1.5">
            {synthese.recommandations.map((rec, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Missing elements */}
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
          <h5 className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
            Éléments manquants
          </h5>
          <ul className="space-y-1">
            {synthese.elements_manquants.map((el, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-amber-700">
                <span className="text-xs">⚠</span> {el}
              </li>
            ))}
          </ul>
        </div>

        {/* Conclusion — typewriter */}
        <div className="border-t border-gray-100 pt-4">
          <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Conclusion
          </h5>
          <TypewriterText text={synthese.conclusion} speed={30} />
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-400 text-center pt-2 border-t border-gray-100">
          ⚕️ Cette synthèse est un outil d'aide à la préparation de la RCP. Toute décision
          thérapeutique relève de l'équipe médicale.
        </div>
      </div>
    </div>
  );
}
