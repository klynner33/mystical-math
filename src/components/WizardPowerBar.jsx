import { useState, useEffect } from "react";
import emptyBar from "../assets/powerbar-images/charge-empty-transparentbg.png";

export default function WizardPowerBar({ value = 100 }) {
  
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <div className={`wizard-powerbar-container`}>
      <img src={emptyBar} alt="Wizard Power" className="powerbar-image" />

      <div className="powerbar-fill-container">
        <div
          className={`wizard-powerbar-fill powerbar-fill ${displayValue === 100 ? "full" : ""}`}
          style={{ width: `${displayValue}%` }}
        />
      </div>
      <div className="charge-text">
        <p>WIZARD</p>
      </div>
    </div>
  );
}
