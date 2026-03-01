import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Orchestration } from "./pages/Orchestration";
import { Selection } from "./pages/Selection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/orchestration/:patientId" element={<Orchestration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
