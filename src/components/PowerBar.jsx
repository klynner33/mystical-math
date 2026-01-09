import { useState, useEffect } from "react";
import emptyBar from "../assets/powerbar-images/charge-empty-transparentbg.png";

export default function PowerBar({ value = 100, onCheatFill }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const handleClick = (e) => {
    if (e.shiftKey && onCheatFill) {
      onCheatFill();
    }
  };

  return (
    <div
      className={`powerbar-container`}
      onClick={handleClick}
      title="Shift + Click to fill (dev)"
    >
     
      <img src={emptyBar} alt="Mystic Charge" className="powerbar-image" />
      <div className="powerbar-fill-container">
        <div
          className={`powerbar-fill ${displayValue === 100 ? "full" : ""}`}
          style={{ width: `${displayValue}%` }}
        />
      </div>
      <div className="charge-text">
        <p>MYSTIC CHARGE {Math.min(displayValue, 100)}%</p>
      </div>
    </div>
  );
}
