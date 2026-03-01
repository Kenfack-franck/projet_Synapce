import { ARCHITECTURE_AGENTS, MCP_CONNECTIONS } from "../data/patients";
import { Header } from "./Header";
import { Footer } from "./Footer";

const coucheLabel: Record<string, string> = {
  orchestrateur: "Orchestrateur",
  specialiste: "Agents Spécialistes",
  support: "Agents de Support",
};

const coucheOrder: Record<string, number> = {
  orchestrateur: 0,
  specialiste: 1,
  support: 2,
};

const coucheBg: Record<string, string> = {
  orchestrateur: "bg-pink-50 border-pink-200",
  specialiste: "bg-blue-50 border-blue-200",
  support: "bg-gray-50 border-gray-200",
};

export function Architecture() {
  const grouped = ARCHITECTURE_AGENTS.reduce(
    (acc, agent) => {
      if (!acc[agent.couche]) acc[agent.couche] = [];
      acc[agent.couche].push(agent);
      return acc;
    },
    {} as Record<string, typeof ARCHITECTURE_AGENTS>
  );

  const layers = Object.entries(grouped).sort(
    ([a], [b]) => coucheOrder[a] - coucheOrder[b]
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header rightLabel="Architecture" />

      <main className="max-w-5xl mx-auto w-full px-6 py-8 flex-1">
        {/* Title */}
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Architecture Multi-Agents</h2>
          <p className="text-sm text-gray-500">
            Comment Synapse orchestre les agents spécialistes via le protocole MCP
          </p>
        </div>

        {/* Layer diagram */}
        <div className="space-y-4 mb-10">
          {layers.map(([couche, agents], layerIndex) => (
            <div key={couche} className={`animate-fade-in-up stagger-${layerIndex + 1}`}>
              {/* Layer label */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Couche {3 - layerIndex}
                </span>
                <span className="text-xs text-gray-400">— {coucheLabel[couche]}</span>
              </div>

              {/* Agent cards in this layer */}
              <div
                className={`border rounded-lg p-4 ${coucheBg[couche]}`}
              >
                <div className={`grid gap-3 ${agents.length === 1 ? "grid-cols-1" : agents.length <= 3 ? "grid-cols-3" : "grid-cols-4"}`}>
                  {agents.map((agent) => (
                    <div
                      key={agent.name}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{agent.icone}</span>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800">{agent.name}</h4>
                          <p className="text-[10px] text-gray-400">{agent.role}</p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 leading-relaxed mb-3">
                        {agent.description}
                      </p>

                      {/* Standards */}
                      {agent.standards.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {agent.standards.map((s) => (
                            <span
                              key={s}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* MCP tools */}
                      <div className="flex flex-wrap gap-1">
                        {agent.outils_mcp.map((tool) => (
                          <span
                            key={tool}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-gray-50 text-gray-500 font-mono"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connection arrows between layers */}
              {layerIndex < layers.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="flex flex-col items-center text-gray-300">
                    <div className="w-px h-4 bg-gray-300" />
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor">
                      <path d="M6 8L0 0h12L6 8z" />
                    </svg>
                    <span className="text-[9px] text-gray-400 mt-0.5">MCP (JSON-RPC 2.0)</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* MCP Protocol section */}
        <div className="border border-gray-200 rounded-lg p-5 mb-6 animate-fade-in-up stagger-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Protocole MCP</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Tous les agents communiquent via le protocole{" "}
            <span className="font-semibold text-blue-600">MCP (Model Context Protocol)</span> —
            standard ouvert adopté par Anthropic, OpenAI, Google. Chaque agent est un serveur MCP
            indépendant exposant ses outils. Ajouter un nouvel organe = ajouter un nouveau serveur
            MCP.
          </p>

          {/* Connection count */}
          <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
            <span>{MCP_CONNECTIONS.length} connexions actives</span>
            <span>·</span>
            <span>
              {MCP_CONNECTIONS.filter((c) => c.type === "orchestration").length} orchestration
            </span>
            <span>·</span>
            <span>{MCP_CONNECTIONS.filter((c) => c.type === "data").length} data</span>
            <span>·</span>
            <span>
              {MCP_CONNECTIONS.filter((c) => c.type === "verification").length} vérification
            </span>
          </div>
        </div>

        {/* Extensibility */}
        <div className="border border-gray-200 rounded-lg p-5 animate-fade-in-up stagger-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Extensibilité</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Aujourd'hui : <span className="font-semibold">4 agents spécialistes</span> (thorax,
            foie, ganglions, os).
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Demain : Agent Cerveau (neuro-oncologie), Agent Peau (dermato-oncologie), Agent Prostate
            (uro-oncologie), Agent Sein (sénologie)...
          </p>
          <p className="text-sm text-gray-500 italic">
            L'architecture est prête. Chaque spécialité = un nouveau serveur MCP.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
