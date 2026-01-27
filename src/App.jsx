import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
// OneLife
import Onelife from "./pages/Minecraft/Onelife.jsx";
// API
import Fortune from "./pages/fun/Fortune.jsx";
import Roast from "./pages/fun/Roast.jsx";
// Tip
import Tip from "./pages/tip/Tip.jsx";
import TipSuccess from "./pages/tip/TipSuccess.jsx";
// Contact/Privacy/Terms
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/onelife" element={<Onelife />} />

      <Route path="/fun/fortune" element={<Fortune />} />
      <Route path="/fun/roast" element={<Roast />} />

      <Route path="/tip" element={<Tip />} />
      <Route path="/tip/success" element={<TipSuccess />} />

      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}