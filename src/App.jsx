import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";

// API
import Fortune from "./pages/api/Fortune.jsx";
import Roast from "./pages/api/Roast.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/api/fortune" element={<Fortune />} />
      <Route path="/api/roast" element={<Roast />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}