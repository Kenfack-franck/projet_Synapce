import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AgentAccordion } from "../components/AgentAccordion";
import { ClinicalTimeline } from "../components/ClinicalTimeline";
import { CorrelationCard } from "../components/CorrelationCard";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { TumorBoardSynthesisView } from "../components/TumorBoardSynthesis";
import { PATIENTS } from "../data/patients";

type AgentRuntimeState = "pending" | "running" | "done";
type SimulationMode = "hyper" | "agent";

export function Orchestration() {
  const navigate = useNavigate();
  const { patientId } = useParams<{ patientId: string }>();
  const patient = useMemo(() => PATIENTS.find((item) => item.id === patientId), [patientId]);
  const agents = useMemo(() => patient?.agents.slice(0, 4) ?? [], [patient]);

  const [mode, setMode] = useState<SimulationMode>("hyper");
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(0);

  // Hyper-agent simulation
  const [showActivation, setShowActivation] = useState(false);
  const [agentStates, setAgentStates] = useState<AgentRuntimeState[]>(["pending", "pending", "pending", "pending"]);
  const [showCorrelationBanner, setShowCorrelationBanner] = useState(false);
  const [visibleCorrelations, setVisibleCorrelations] = useState(0);
  const [showSynthesisBanner, setShowSynthesisBanner] = useState(false);

  // Shared end state
  const [analysisDone, setAnalysisDone] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Single-agent simulation
  const [singleAgentState, setSingleAgentState] = useState<AgentRuntimeState>("pending");
  const [singleReportVisibleSections, setSingleReportVisibleSections] = useState(0);

  const resultsRef = useRef<HTMLDivElement | null>(null);
  const selectedAgent = useMemo(() => agents[selectedAgentIndex], [agents, selectedAgentIndex]);

  const resetStates = () => {
    setShowActivation(false);
    setAgentStates(["pending", "pending", "pending", "pending"]);
    setShowCorrelationBanner(false);
    setVisibleCorrelations(0);
    setShowSynthesisBanner(false);
    setAnalysisDone(false);
    setShowResults(false);
    setSingleAgentState("pending");
    setSingleReportVisibleSections(0);
  };

  useEffect(() => {
    if (!patient) {
      return;
    }

    resetStates();

    const timers: number[] = [];
    const schedule = (fn: () => void, delay: number) => {
      timers.push(window.setTimeout(fn, delay));
    };

    if (mode === "hyper") {
      schedule(() => setShowActivation(true), 500);
      schedule(() => setAgentStates(["running", "pending", "pending", "pending"]), 800);
      schedule(() => setAgentStates(["done", "running", "pending", "pending"]), 2500);
      schedule(() => setAgentStates(["done", "done", "running", "pending"]), 4000);
      schedule(() => setAgentStates(["done", "done", "done", "running"]), 5200);
      schedule(() => setAgentStates(["done", "done", "done", "done"]), 6000);

      schedule(() => setShowCorrelationBanner(true), 7000);
      schedule(() => setVisibleCorrelations(1), 7500);
      schedule(() => setVisibleCorrelations(2), 8000);
      schedule(() => setVisibleCorrelations(3), 8500);
      schedule(() => setVisibleCorrelations(4), 9000);

      schedule(() => setShowSynthesisBanner(true), 10000);
      schedule(() => setAnalysisDone(true), 13000);
      schedule(() => setShowResults(true), 13000);
    } else if (selectedAgent) {
      schedule(() => setSingleAgentState("running"), 400);

      selectedAgent.rapport.forEach((_, idx) => {
        schedule(() => setSingleReportVisibleSections(idx + 1), 1200 + idx * 900);
      });

      const finishAt = 1200 + selectedAgent.rapport.length * 900 + 600;
      schedule(() => setSingleAgentState("done"), finishAt);
      schedule(() => setAnalysisDone(true), finishAt + 300);
      schedule(() => setShowResults(true), finishAt + 300);
    }

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [mode, patient, selectedAgentIndex]);

  useEffect(() => {
    if (showResults) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showResults]);

  if (!patient) {
    return (
      <div className="min-h-screen bg-white">
        <Header backLabel="Patients" backTo="/selection" />
        <main className="mx-auto max-w-5xl px-6 py-12 md:px-8">
          <p className="text-sm text-gray-600">Patient introuvable.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const staticCorrelations = patient.synthese_tumor_board.correlations.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Header backLabel="Patients" backTo="/selection" patientId={patient.id} />

      <main className="mx-auto max-w-5xl px-6 py-12 md:px-8">
        <section className="mb-8 border-b border-gray-100 pb-4">
          <h1 className="text-[24px] font-bold text-gray-900">
            Patient {patient.id} · {patient.age} ans · {patient.sexe}
          </h1>
          <p className="mt-1 text-sm text-gray-700">
            {patient.diagnostic_principal} — {patient.traitement_en_cours}
          </p>
          <p className="mt-2 text-sm text-gray-600">{patient.contexte}</p>
        </section>

        <section className="mb-6 grid gap-3 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setMode("hyper")}
            className={`rounded-xl border p-4 text-left transition-all ${
              mode === "hyper"
                ? "border-blue-300 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <p className="text-sm font-semibold text-gray-800">🧠 Simulation complète Hyper-Agent</p>
            <p className="mt-1 text-sm text-gray-600">
              Orchestre tous les sous-agents puis génère la synthèse tumor board complète.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setMode("agent")}
            className={`rounded-xl border p-4 text-left transition-all ${
              mode === "agent"
                ? "border-blue-300 bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <p className="text-sm font-semibold text-gray-800">🧩 Simulation ciblée sous-agent</p>
            <p className="mt-1 text-sm text-gray-600">
              Permet de choisir un agent (thorax, foie, ganglions, os) et voir son rapport évoluer distinctement.
            </p>
          </button>
        </section>

        {mode === "agent" && (
          <section className="mb-6">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-400">Choix du sous-agent</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {agents.map((agent, index) => (
                <button
                  key={`${patient.id}-${agent.organe}`}
                  type="button"
                  onClick={() => setSelectedAgentIndex(index)}
                  className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                    selectedAgentIndex === index
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <p className="font-semibold text-gray-800">
                    {agent.icone} {agent.agent_name}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{agent.standard_medical}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {mode === "hyper" && (
          <>
            {showActivation && (
              <section className="animate-fade-in-up mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                <p className="font-semibold">🧠 Hyper-Agent Tumor Board</p>
                <p>Scanner TAP détecté → Activation de 4 agents spécialistes</p>
              </section>
            )}

            <section>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {agents.map((agent, index) => (
                  <AgentRuntimeCard
                    key={agent.agent_name}
                    icon={agent.icone}
                    name={agent.agent_name.replace("Agent ", "")}
                    state={agentStates[index] ?? "pending"}
                    result={agent.resume_court}
                  />
                ))}
              </div>
            </section>

            {showCorrelationBanner && (
              <section className="animate-fade-in-up mt-8 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                <p className="font-semibold">🧠 Hyper-Agent : Corrélation inter-organes...</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-100">
                  <div className="h-full w-3/4 rounded-full bg-blue-600" />
                </div>
                <p className="mt-1 text-xs">75%</p>
              </section>
            )}

            {visibleCorrelations > 0 && (
              <section className="mt-4 space-y-3">
                {staticCorrelations.slice(0, visibleCorrelations).map((correlation, idx) => (
                  <CorrelationCard
                    key={correlation.titre}
                    correlation={correlation}
                    className={`animate-fade-in-up stagger-${idx + 1}`}
                  />
                ))}
              </section>
            )}

            {showSynthesisBanner && (
              <section className="animate-fade-in-up mt-8 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                <p className="font-semibold">🧠 Hyper-Agent : Génération de la synthèse RCP...</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-blue-100">
                  <div className="h-full animate-fill-progress rounded-full bg-blue-600" />
                </div>
                <p className="mt-1 text-xs">90%</p>
              </section>
            )}
          </>
        )}

        {mode === "agent" && selectedAgent && (
          <section className="space-y-4">
            <div className="animate-fade-in-up rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
              <p className="font-semibold">
                {selectedAgent.icone} {selectedAgent.agent_name} — Exécution ciblée
              </p>
              <p>Analyse spécialisée en cours avec génération progressive du rapport structuré.</p>
            </div>

            <AgentRuntimeCard
              icon={selectedAgent.icone}
              name={selectedAgent.agent_name.replace("Agent ", "")}
              state={singleAgentState}
              result={selectedAgent.resume_court}
            />

            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-400">
                Rapport en cours de génération
              </p>
              <div className="space-y-3">
                {selectedAgent.rapport.slice(0, singleReportVisibleSections).map((section, idx) => (
                  <div key={`${selectedAgent.organe}-${section.titre}`} className={`animate-fade-in-up stagger-${idx + 1} rounded-lg bg-gray-50 p-3`}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{section.titre}</p>
                    <p className="mt-1 text-sm text-gray-700">{section.contenu}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {analysisDone && (
          <section className="animate-fade-in-up mt-8 rounded-xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
            <p className="font-semibold">✅ Analyse terminée</p>
            <p className="mt-1">
              {mode === "hyper"
                ? `4 agents · ${patient.synthese_tumor_board.correlations.length} corrélations · Synthèse prête`
                : `Sous-agent ${selectedAgent?.agent_name ?? ""} · rapport prêt`}
            </p>
            <button
              type="button"
              onClick={() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="mt-3 cursor-pointer text-sm font-medium text-green-800 underline"
            >
              Voir les résultats complets →
            </button>
          </section>
        )}

        {showResults && (
          <section ref={resultsRef} className="mt-12 border-t border-gray-200 pt-12">
            <ClinicalTimeline timeline={patient.timeline} />

            <div className="mt-10">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-400">
                {mode === "hyper" ? "Analyse par organe" : "Rapport détaillé du sous-agent"}
              </p>
              <div className="space-y-4">
                {mode === "hyper"
                  ? patient.agents.map((agent) => <AgentAccordion key={`${patient.id}-${agent.organe}`} agent={agent} />)
                  : selectedAgent && <AgentAccordion key={`${patient.id}-${selectedAgent.organe}`} agent={selectedAgent} />}
              </div>
            </div>

            {mode === "hyper" ? (
              <div className="mt-10">
                <TumorBoardSynthesisView synthese={patient.synthese_tumor_board} />
              </div>
            ) : (
              <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
                <p className="text-sm font-semibold text-blue-800">Souhaitez-vous la synthèse globale ?</p>
                <p className="mt-1 text-sm text-blue-700">
                  Vous pouvez lancer immédiatement l'orchestration complète pour générer la corrélation inter-organes.
                </p>
                <button
                  type="button"
                  onClick={() => setMode("hyper")}
                  className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Lancer la synthèse Hyper-Agent
                </button>
              </div>
            )}

            <div className="mt-8">
              <button
                type="button"
                onClick={() => navigate("/selection")}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-800"
              >
                ← Retour aux patients
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

function AgentRuntimeCard({
  icon,
  name,
  state,
  result,
}: {
  icon: string;
  name: string;
  state: AgentRuntimeState;
  result: string;
}) {
  const cardStyle =
    state === "pending"
      ? "bg-gray-50 border-gray-200 opacity-60"
      : state === "running"
      ? "bg-white border-blue-300"
      : "bg-white border-green-300";

  return (
    <article className={`rounded-xl border p-4 transition-all duration-500 ${cardStyle}`}>
      <p className="text-sm font-semibold text-gray-800">
        {icon} {name}
      </p>

      {state === "pending" && (
        <>
          <p className="mt-2 text-sm text-gray-500">En attente</p>
          <div className="mt-3 h-1.5 rounded-full bg-gray-200" />
        </>
      )}

      {state === "running" && (
        <>
          <p className="mt-2 text-sm text-blue-700">Analyse...</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-blue-100">
            <div className="h-full w-1/3 animate-indeterminate rounded-full bg-blue-500" />
          </div>
        </>
      )}

      {state === "done" && (
        <>
          <p className="mt-2 text-sm text-green-700">✅ Terminé</p>
          <p className="mt-2 text-xs text-gray-600">{result}</p>
        </>
      )}
    </article>
  );
}
