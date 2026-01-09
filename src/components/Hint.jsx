import spellbook from "../assets/inventory-images/extra-images/earth-spellbook.png";

export default function Hint({ chart, displayHint, setDisplayHint }) {
  return (
    <>
      {displayHint === "book" && (
        <div className="hint-container">
          <div className="hint">
            <p>Need help?</p>
            <img
              src={spellbook}
              alt="Spell Book"
              className="spell-book"
              onClick={() => setDisplayHint("chart")}
            />
            <p>Click the book!</p>
          </div>
        </div>
      )}
      {displayHint === "chart" && (
        <div className="chart-container">
          <div className="chart">
            <span
              className="close-chart"
              onClick={() => setDisplayHint("book")}
            >
              X
            </span>
            <img src={chart} alt="Hint Chart" className="chart-image" />
          </div>
        </div>
      )}
    </>
  );
}
