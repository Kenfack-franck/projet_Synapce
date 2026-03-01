import { useParams } from "react-router-dom";
import { PATIENTS } from "../data/patients";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StatusBadge } from "./StatusBadge";
import { ClinicalTimeline } from "./ClinicalTimeline";
import { AgentAccordion } from "./AgentAccordion";
import { TumorBoardSynthesisView } from "./TumorBoardSynthesis";

export function PatientDossier() {
  const { id } = useParams<{ id: string }>();
  const patient = PATIENTS.find((p) => p.id === id);

  if (!patient) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">Patient non trouvé.</p>
        </main>
      </div>
    );
  }

  const synth = patient.synthese_tumor_board;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Header rightLabel="Prêt pour RCP" />

      <main className="max-w-4xl mx-auto w-full px-6 py-8 flex-1">
        {/* Patient info */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 animate-fade-in-up stagger-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">Patient {patient.id}</h2>
              <p className="text-sm text-gray-500">
                {patient.age} ans · {patient.sexe} · {patient.diagnostic_principal}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">{patient.traitement_en_cours}</p>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">{patient.contexte}</p>
            </div>
            <StatusBadge
              color={synth.evaluation_color}
              label={synth.evaluation_globale.split("—")[0].trim()}
              size="lg"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
          <ClinicalTimeline timeline={patient.timeline} />
        </div>

        {/* Agent reports */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 animate-fade-in-up stagger-3">
            Analyse par organe
          </h3>
          <div className="space-y-3">
            {patient.agents.map((agent, i) => (
              <AgentAccordion key={agent.organe} agent={agent} index={i} />
            ))}
          </div>
        </div>

        {/* Tumor Board Synthesis */}
        <TumorBoardSynthesisView synthese={patient.synthese_tumor_board} />
      </main>

      <Footer />
    </div>
  );
}
