import GameEngine from "../components/GameEngine.jsx";
import multiplicationChart from "../assets/charts/multiplication-chart.png";
import spellbook from "../assets/inventory-images/extra-images/earth-spellbook.png";

export default function MultiplicationGame() {
  return (
    <GameEngine
      operator="×"
      chart={multiplicationChart}
      spellbook={spellbook}
      generateNumbers={() => ({
        top: Math.floor(Math.random() * 13),
        bottom: Math.floor(Math.random() * 13),
      })}
      checkCorrect={(top, bottom, value) => value === top * bottom}
    />
  );
}
