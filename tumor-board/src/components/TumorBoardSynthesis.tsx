import type { TumorBoardSynthesis as TBSynthesis } from "../data/patients";
import { TypewriterText } from "./TypewriterText";

const corrTypeStyle: Record<string, string> = {
  alerte: "border-red-500 bg-red-50",
  attention: "border-amber-500 bg-amber-50",
  info: "border-blue-500 bg-blue-50",
};

export function TumorBoardSynthesisView({ synthese }: { synthese: TBSynthesis }) {
  const evaluationStyle =
    synthese.evaluation_color === "red"
      ? "border-red-300 bg-red-50 text-red-700"
      : synthese.evaluation_color === "green"
      ? "border-green-300 bg-green-50 text-green-700"
      : "border-amber-300 bg-amber-50 text-amber-700";

  return (
    <div>
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-400">
        Synthèse Tumor Board
      </h3>

      <section className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <div>
            <h4 className="text-[15px] font-semibold text-gray-800">Synthèse — Hyper-Agent Tumor Board</h4>
            <p className="text-xs text-gray-500">Orchestration · Corrélation · Préparation RCP</p>
          </div>
        </div>

        <div className={`rounded-lg border p-5 text-center ${evaluationStyle}`}>
          <p className="text-lg font-semibold uppercase tracking-wide">{synthese.evaluation_globale}</p>
        </div>

        <div>
          <h5 className="mb-3 text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-400">
            Corrélations détectées
          </h5>
          <div className="space-y-3">
            {synthese.correlations.map((corr) => (
              <div key={corr.titre} className={`rounded-r-lg border-l-4 p-4 ${corrTypeStyle[corr.type] ?? corrTypeStyle.info}`}>
                <p className="text-sm font-semibold text-gray-800">
                  {corr.icone} {corr.titre}
                </p>
                <p className="mt-1 text-sm text-gray-600">{corr.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="mb-3 text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-400">
            Points de discussion RCP
          </h5>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700">
            {synthese.points_discussion.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ol>
        </div>

        <div>
          <h5 className="mb-3 text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-400">Éléments manquants</h5>
          <div className="rounded-lg bg-amber-50 p-4 text-amber-700">
            <ul className="space-y-1 text-sm">
              {synthese.elements_manquants.map((item) => (
                <li key={item}>⚠ {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h5 className="mb-3 text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-400">Conclusion</h5>
          <TypewriterText text={synthese.conclusion} speed={30} />
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
          ⚕️ Cette synthèse est un outil d'aide à la préparation de la RCP. Toute décision thérapeutique
          relève de l'équipe médicale.
        </div>
      </section>
    </div>
  );
}
