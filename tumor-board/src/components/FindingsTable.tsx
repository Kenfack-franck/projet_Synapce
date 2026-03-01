import type { Finding } from "../data/patients";

export function FindingsTable({ findings }: { findings: Finding[] }) {
  if (findings.length === 0) {
    return <p className="text-sm text-gray-400 italic">Aucune lésion détectée.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100">
            <th className="pb-2 pr-3 font-medium">ID</th>
            <th className="pb-2 pr-3 font-medium">Description</th>
            <th className="pb-2 pr-3 font-medium">Taille</th>
            <th className="pb-2 pr-3 font-medium">Évolution</th>
            <th className="pb-2 pr-3 font-medium">Type</th>
            <th className="pb-2 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {findings.map((f) => (
            <tr key={f.id} className={`border-b border-gray-50 ${f.alerte ? "bg-red-50/50" : ""}`}>
              <td className="py-2.5 pr-3 font-mono font-medium text-gray-600">{f.id}</td>
              <td className="py-2.5 pr-3 text-gray-700">{f.description}</td>
              <td className="py-2.5 pr-3">
                <span className="font-mono font-medium text-gray-800">{f.taille_actuelle}</span>
                {f.taille_precedente && (
                  <span className="text-xs text-gray-400 ml-1">← {f.taille_precedente}</span>
                )}
              </td>
              <td className="py-2.5 pr-3">
                {f.evolution && (
                  <span
                    className={`font-mono font-medium ${
                      f.evolution.startsWith("+")
                        ? "text-red-600"
                        : f.evolution.startsWith("-")
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {f.evolution}
                  </span>
                )}
              </td>
              <td className="py-2.5 pr-3">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    f.classification === "Cible"
                      ? "bg-blue-50 text-blue-600"
                      : f.classification === "Nouveau"
                      ? "bg-red-50 text-red-600"
                      : "bg-gray-50 text-gray-500"
                  }`}
                >
                  {f.classification}
                </span>
              </td>
              <td className="py-2.5">
                {f.alerte && (
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500" title="Alerte" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
