import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
// API
import Fortune from "./pages/fun/Fortune.jsx";
import Roast from "./pages/fun/Roast.jsx";
// Tip
import Tip from "./pages/Tip.jsx";
import TipSuccess from "./pages/TipSuccess.jsx";
// Contact
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/fun/fortune" element={<Fortune />} />
      <Route path="/fun/roast" element={<Roast />} />

      <Route path="/tip" element={<Tip />} />
      <Route path="/tip/success" element={<TipSuccess />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}