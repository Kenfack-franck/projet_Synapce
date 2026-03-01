import { Link, useLocation, useNavigate } from "react-router-dom";

type HeaderProps = {
  rightLabel?: string;
  backLabel?: string;
  backTo?: string;
  patientId?: string;
};

export function Header({ rightLabel, backLabel, backTo, patientId }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToArchitecture = () => {
    if (location.pathname === "/") {
      const section = document.getElementById("architecture");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    navigate("/#architecture");
  };

  return (
    <header className="sticky top-0 z-50 h-14 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-4">
          {backLabel && (
            <button
              type="button"
              onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
              className="text-sm text-slate-500 transition-colors hover:text-slate-800"
            >
              ← {backLabel}
            </button>
          )}

          <Link to="/" className="inline-flex items-center gap-2 no-underline">
            <span className="text-blue-600">✦</span>
            <span className="text-base font-semibold text-slate-800">Synapse</span>
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <Link
            to="/"
            className={`text-sm no-underline transition-colors ${
              location.pathname === "/" ? "text-slate-800" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Accueil
          </Link>

          <Link
            to="/selection"
            className={`text-sm no-underline transition-colors ${
              location.pathname === "/selection" ? "text-slate-800" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Patients
          </Link>

          {patientId && (
            <Link
              to={`/orchestration/${patientId}`}
              className={`text-sm no-underline transition-colors ${
                location.pathname.startsWith("/orchestration/")
                  ? "text-slate-800"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Simulation
            </Link>
          )}

          <button
            type="button"
            onClick={scrollToArchitecture}
            className="text-sm text-slate-500 transition-colors hover:text-blue-600"
          >
            Architecture
          </button>
          {rightLabel && <span className="text-sm text-slate-400">{rightLabel}</span>}
        </div>
      </div>
    </header>
  );
}
