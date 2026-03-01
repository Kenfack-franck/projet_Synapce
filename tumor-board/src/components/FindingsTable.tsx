import type { Finding } from "../data/patients";

export function FindingsTable({ findings }: { findings: Finding[] }) {
  if (findings.length === 0) {
    return <p className="text-sm text-gray-400 italic">Aucune lésion détectée.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-100">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-400">
            <th className="px-3 py-2 font-medium">ID</th>
            <th className="px-3 py-2 font-medium">Actuel</th>
            <th className="px-3 py-2 font-medium">Précédent</th>
            <th className="px-3 py-2 font-medium">Évolution</th>
            <th className="px-3 py-2 font-medium">Classif.</th>
          </tr>
        </thead>
        <tbody>
          {findings.map((f) => (
            <tr key={f.id} className={`border-b border-gray-50 ${f.alerte ? "bg-red-50/50" : ""}`}>
              <td className="px-3 py-2.5 font-mono font-medium text-gray-600">{f.id}</td>
              <td className="px-3 py-2.5 font-mono text-gray-700">{f.taille_actuelle}</td>
              <td className="px-3 py-2.5 font-mono text-gray-500">{f.taille_precedente ?? "—"}</td>
              <td className="px-3 py-2.5">
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
              <td className="px-3 py-2.5 text-gray-600">{f.classification}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
