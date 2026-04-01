import { useState, useEffect } from "react";
import emptyBar from "../assets/powerbar-images/charge-empty-transparentbg.png";

export default function PowerBar({ value = 100, onCheatFill }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const fillInteractive = Boolean(onCheatFill);

  const handleActivate = () => {
    if (onCheatFill) {
      onCheatFill();
    }
  };

  const handleClick = () => {
    handleActivate();
  };

  const handleKeyDown = (e) => {
    if (!fillInteractive) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
  };

  const title = fillInteractive
    ? "Tap or Shift+click to fill mystic charge and open the wizard battle prompt"
    : "Mystic charge";

  return (
    <div
      className={`powerbar-container${fillInteractive ? " powerbar-battle-ready" : ""}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={fillInteractive ? "button" : undefined}
      tabIndex={fillInteractive ? 0 : undefined}
      aria-label={fillInteractive ? "Fill mystic charge and open wizard battle" : undefined}
      title={title}
    >
     
      <img
        src={emptyBar}
        alt={fillInteractive ? "" : "Mystic Charge"}
        className="powerbar-image"
        aria-hidden={fillInteractive || undefined}
      />
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
