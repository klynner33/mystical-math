import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import AdditionGame from "./pages/AdditionGame.jsx"
import SubtractionGame from "./pages/SubtractionGame.jsx"
import MultiplicationGame from "./pages/MultiplicationGame.jsx"
import DivisionGame from "./pages/DivisionGame.jsx"
import Inventory from "./pages/Inventory.jsx"
import WizardBattle from "./pages/WizardBattle.jsx"

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addition-game" element={<AdditionGame />} />
      <Route path="/subtraction-game" element={<SubtractionGame />} />
      <Route path="/multiplication-game" element={<MultiplicationGame />} />
      <Route path="/division-game" element={<DivisionGame />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/wizard-battle" element={<WizardBattle />} />
    </Routes>
  );
}
