import { Link, useNavigate, useLocation } from "react-router-dom";

export function Header({ rightLabel }: { rightLabel?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const showBack = location.pathname !== "/";

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 12L6 8l4-4" />
              </svg>
              Retour
            </button>
          )}
          <Link to="/" className="no-underline">
            <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span className="text-blue-600">✦</span> Synapse
            </h1>
            <p className="text-[10px] text-gray-400 tracking-wide">Tumor Board Assistant</p>
          </Link>
        </div>
        {rightLabel && <span className="text-sm text-gray-400">{rightLabel}</span>}
      </div>
    </header>
  );
}
