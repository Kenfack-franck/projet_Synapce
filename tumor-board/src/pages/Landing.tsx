import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ARCHITECTURE_AGENTS } from "../data/patients";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";

const layerLabel: Record<string, string> = {
  specialiste: "Spécialiste",
  support: "Support",
  orchestrateur: "Orchestrateur",
};

export function Landing() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#architecture") {
      setTimeout(() => {
        const section = document.getElementById("architecture");
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-12 md:px-8">
        <section className="py-12 text-center">
          <SectionLabel>Tumor Board Assistant</SectionLabel>
          <h1 className="mt-4 text-4xl font-bold text-gray-900">Synapse</h1>
          <p className="mx-auto mt-3 max-w-3xl text-xl font-semibold text-gray-800">
            Préparation intelligente des Réunions de Concertation Pluridisciplinaire
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-gray-600">
            Synapse orchestre des agents IA spécialistes par organe et détecte les corrélations inter-organes
            que les analyses individuelles ne révèlent pas.
          </p>
          <button
            type="button"
            onClick={() => navigate("/selection")}
            className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Voir une analyse →
          </button>
          <div className="mt-4 flex justify-center gap-6 text-xs text-gray-400">
            <span>8 agents</span>
            <span>4 spécialités</span>
            <span>Synthèse en 45s</span>
          </div>
        </section>

        <section className="rounded-2xl bg-slate-50 px-5 py-16 md:px-8">
          <SectionLabel>Le problème</SectionLabel>
          <h2 className="text-[18px] font-semibold text-gray-800">La préparation du Tumor Board prend trop de temps</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: "⏱️",
                value: "45 min",
                text: "Par patient pour comparer les examens multi-organes et rédiger la synthèse",
              },
              {
                icon: "🔍",
                value: "3-5",
                text: "Rapports séparés à croiser manuellement. Les corrélations inter-organes sont faites de mémoire.",
              },
              {
                icon: "⚠️",
                value: "Risque",
                text: "Des patterns subtils (réponse dissociée, VDT rapide) peuvent être manqués sous pression de temps.",
              },
            ].map((item) => (
              <article key={item.value} className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                <p className="text-2xl">{item.icon}</p>
                <p className="mt-2 text-lg font-semibold text-gray-800">{item.value}</p>
                <p className="mt-2 text-sm text-gray-600">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16">
          <SectionLabel>Notre approche</SectionLabel>
          <h2 className="text-[18px] font-semibold text-gray-800">
            Des agents spécialistes orchestrés par un hyper-agent central
          </h2>
          <p className="mt-3 max-w-4xl text-sm text-gray-600">
            Chaque organe a son agent IA dédié. L'hyper-agent Tumor Board orchestre l'ensemble, détecte les
            corrélations inter-organes, et prépare la synthèse RCP.
          </p>

          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mx-auto max-w-2xl rounded-lg border-2 border-blue-500 bg-blue-50 p-4 text-center">
              <p className="font-semibold text-gray-800">🧠 Hyper-Agent Tumor Board</p>
              <p className="text-sm text-gray-600">Orchestre · Corrèle · Synthétise</p>
            </div>
            <div className="mx-auto mt-3 grid max-w-2xl grid-cols-2 gap-2 text-center md:grid-cols-4">
              {[
                "🫁 Thorax",
                "🫀 Foie",
                "🔵 Ganglions",
                "🦴 Os",
              ].map((label) => (
                <div key={label} className="rounded-lg border border-gray-200 bg-white p-3 text-sm font-medium text-gray-700">
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card title="Agents Spécialistes" text="4 agents dédiés (Thorax, Foie, Ganglions, Os). Chacun maîtrise les critères de sa spécialité." />
            <Card title="Agents de Support" text="RAG Guidelines (NCCN, ESMO), Historique Patient, Qualité & Anti-hallucination." />
            <Card title="Hyper-Agent" text="Orchestre les spécialistes, détecte les corrélations inter-organes, calcule le RECIST global, prépare la synthèse RCP." />
          </div>
        </section>

        <section className="rounded-2xl bg-slate-50 px-5 py-16 md:px-8">
          <SectionLabel>Capacités</SectionLabel>
          <h2 className="text-[18px] font-semibold text-gray-800">Ce que l'hyper-agent révèle</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card
              title="🔗 Corrélations inter-organes"
              text="Progression pulmonaire + nouvelles métastases hépatiques → Dissémination systémique détectée automatiquement."
            />
            <Card
              title="⏱️ VDT Prédictif"
              text="Temps de doublement volumétrique <400j = suspect. Indicateur rarement calculé en routine, calculé ici automatiquement."
            />
            <Card
              title="🛡️ Vérification croisée"
              text="L'agent Qualité vérifie la cohérence entre les rapports des spécialistes. Chaque mesure est traçable."
            />
            <Card
              title="📋 Synthèse pré-RCP"
              text="Points de discussion, recommandations thérapeutiques, éléments manquants — tout est préparé pour la réunion."
            />
          </div>
        </section>

        <section id="architecture" className="py-16">
          <SectionLabel>Architecture</SectionLabel>
          <h2 className="text-[18px] font-semibold text-gray-800">Architecture Multi-Agents MCP</h2>
          <p className="mt-3 text-sm text-gray-600">
            Tous les agents communiquent via le protocole MCP (Model Context Protocol), standard ouvert.
            Chaque agent est un serveur MCP indépendant.
          </p>

          <div className="mt-6">
            <ArchitectureDiagram />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {ARCHITECTURE_AGENTS.map((agent) => (
              <article key={agent.name} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-800">
                    {agent.icone} {agent.name}
                  </p>
                  <StatusBadge status={layerLabel[agent.couche].toLowerCase() === "orchestrateur" ? "info" : "normal"} label={layerLabel[agent.couche]} />
                </div>
                <p className="text-xs text-gray-500">{agent.role}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Outils MCP</p>
                <ul className="mt-1 space-y-1 font-mono text-xs text-gray-600">
                  {agent.outils_mcp.slice(0, 4).map((tool) => (
                    <li key={tool}>• {tool}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Standards</p>
                <p className="text-xs text-gray-600">{agent.standards.join(" · ")}</p>
                <p className="mt-3 text-xs text-gray-600">{agent.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600">
            <p className="font-semibold text-gray-800">MCP — Model Context Protocol</p>
            <p className="mt-2">Standard ouvert pour connecter l'IA aux outils.</p>
            <p>Chaque agent = 1 serveur MCP indépendant.</p>
            <p>Communication via JSON-RPC 2.0.</p>
            <p>Adopté par Anthropic, OpenAI, Google, Microsoft.</p>
            <p className="mt-2">Extensible : ajouter un organe = ajouter un serveur.</p>
          </div>
        </section>

        <section className="py-16 text-center">
          <h2 className="text-[18px] font-semibold text-gray-800">Voir Synapse en action</h2>
          <button
            type="button"
            onClick={() => navigate("/selection")}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            Lancer une analyse →
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="mb-3 text-[11px] font-semibold uppercase tracking-[1.5px] text-gray-400">{children}</p>;
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-[15px] font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{text}</p>
    </article>
  );
}
