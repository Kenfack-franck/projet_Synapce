import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { OrganBadge } from "../components/OrganBadge";
import { StatusBadge } from "../components/StatusBadge";
import { PATIENTS } from "../data/patients";

const urgencyDot: Record<string, string> = {
  critique: "bg-red-500",
  attention: "bg-amber-500",
  stable: "bg-green-500",
};

const urgenceLabel: Record<string, string> = {
  critique: "Progressive Disease",
  attention: "Surveillance rapprochée",
  stable: "Réponse favorable",
};

export function Selection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-12 md:px-8">
        <section className="mx-auto max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-400">Préparation RCP</p>
          <h1 className="text-2xl font-bold text-gray-900">Sélectionnez un patient</h1>
          <p className="mt-2 text-sm text-gray-600">
            Choisissez un dossier patient pour lancer l'analyse multi-agents.
          </p>

          <div className="mt-6 grid gap-4">
            {PATIENTS.map((patient) => {
              const lastExam = patient.timeline[patient.timeline.length - 1];
              return (
                <article
                  key={patient.id}
                  onClick={() => navigate(`/orchestration/${patient.id}`)}
                  className="relative cursor-pointer rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-blue-400 hover:shadow-md"
                >
                  <div className={`absolute right-6 top-6 h-3 w-3 rounded-full ${urgencyDot[patient.urgence]}`} />

                  <h3 className="text-[15px] font-semibold text-gray-800">Patient {patient.id}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {patient.age} ans · {patient.sexe}
                  </p>
                  <p className="text-sm text-gray-700">{patient.diagnostic_principal}</p>
                  <p className="text-sm text-gray-700">{patient.traitement_en_cours}</p>

                  <p className="mt-3 text-sm text-gray-500">
                    {patient.nombre_examens} examens · Dernière imagerie : {lastExam?.date ?? "—"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {patient.organes_concernes.map((organe) => (
                      <OrganBadge key={`${patient.id}-${organe}`} organ={organe} />
                    ))}
                  </div>

                  <div className="mt-4">
                    <StatusBadge status={patient.urgence} label={urgenceLabel[patient.urgence]} />
                  </div>

                  <p className="mt-3 text-sm text-gray-600">“{patient.resume_worklist}”</p>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
