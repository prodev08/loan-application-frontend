import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "@/pages/start";
import LoanPage from "@/pages/loan";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/loan" element={<LoanPage />} />
        <Route path="*" element={"No page"} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
