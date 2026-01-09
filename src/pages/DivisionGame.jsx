import GameEngine from "../components/GameEngine.jsx";
import divisionChart from "../assets/charts/division-chart.png";
import spellbook from "../assets/inventory-images/extra-images/earth-spellbook.png";

export default function DivisionGame() {
  return (
    <GameEngine
      operator="÷"
      chart={divisionChart}
      spellbook={spellbook}
      generateNumbers={() => {
        const divisor = Math.floor(Math.random() * 12) + 1;
        const quotient = Math.floor(Math.random() * 13);
        return { top: divisor * quotient, bottom: divisor };
      }}
      checkCorrect={(top, bottom, value) => value === top / bottom}
    />
  );
}
