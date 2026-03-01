import { Link } from "react-router-dom";
import { PATIENTS } from "../data/patients";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PatientCard } from "./PatientCard";

export function Worklist() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header rightLabel="Préparation RCP" />

      <main className="max-w-4xl mx-auto w-full px-6 py-8 flex-1">
        <div className="flex items-center justify-between mb-6 animate-fade-in-up">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Patients en attente de RCP
          </h2>
          <span className="text-sm text-gray-400">{PATIENTS.length} patients</span>
        </div>

        <div className="space-y-4">
          {PATIENTS.map((patient, i) => (
            <div key={patient.id} className={`animate-fade-in-up stagger-${i + 1}`}>
              <PatientCard patient={patient} />
            </div>
          ))}
        </div>

        {/* Link to architecture */}
        <div className="mt-10 pt-6 border-t border-gray-100 animate-fade-in-up stagger-5">
          <Link
            to="/architecture"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-600 transition-colors no-underline"
          >
            <span>ℹ️</span>
            <span>Architecture du système</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 3l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
