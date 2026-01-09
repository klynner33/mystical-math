import GameEngine from "../components/GameEngine.jsx";
import subtractionChart from "../assets/charts/subtraction-chart.png";
import spellbook from "../assets/inventory-images/extra-images/earth-spellbook.png";

export default function SubtractionGame() {
  return (
    <GameEngine
      operator="-"
      chart={subtractionChart}
      spellbook={spellbook}
      generateNumbers={() => {
        const a = Math.floor(Math.random() * 13);
        const b = Math.floor(Math.random() * 13);
        return { top: Math.max(a, b), bottom: Math.min(a, b) };
      }}
      checkCorrect={(top, bottom, value) => value === top - bottom}
    />
  );
}
