import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Worklist } from "./components/Worklist";
import { PatientDossier } from "./components/PatientDossier";
import { Architecture } from "./components/Architecture";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Worklist />} />
        <Route path="/patient/:id" element={<PatientDossier />} />
        <Route path="/architecture" element={<Architecture />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
