import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fullWizard from "../assets/wizard-images/wizard-transparentbg.png";
import slightlyDefeatedWizard from "../assets/wizard-images/wizard-slightly-defeated-transparentbg.png";
import mostlyDefeatedWizard from "../assets/wizard-images/wizard-mostly-defeated-transparentbg.png";
import defeatedWizard from "../assets/wizard-images/wizard-defeated-transparentbg.png";
import ArcadeButton from "../components/ArcadeButton";
import backgroundImage from "../assets/mystical-math-background.png";
import PowerBar from "../components/PowerBar";
import WizardPowerBar from "../components/WizardPowerBar";

export default function WizardBattle() {
  const navigate = useNavigate();

  const [mysticCharge, setMysticCharge] = useState(100);
  const [wizardPower, setWizardPower] = useState(100);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  const [hitEffect, setHitEffect] = useState(false);
  const [damageNumbers, setDamageNumbers] = useState([]);
  const [flashBackground, setFlashBackground] = useState(false);
  const [sparks, setSparks] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [shots, setShots] = useState([]);

  const handleBattleClick = () => {
    if (mysticCharge <= 0 || wizardPower <= 0) return;

    const damage = Math.floor(Math.random() * 6) + 1;

    setHitEffect(true);
    setFlashBackground(true);
    setDamageNumbers((prev) => [...prev, { id: Date.now(), value: damage }]);

    const newSparks = Array.from({ length: 10 }).map(() => ({
      id: Date.now() + Math.random(),
      x: Math.random() * 180,
      y: Math.random() * 200,
    }));
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 500);

    setMysticCharge((prev) => Math.max(prev - damage, 0));
    setWizardPower((prev) => {
      const newPower = Math.max(prev - damage, 0);
      const intensity = Math.ceil((100 - newPower) / 20);
      setShakeIntensity(intensity);
      setTimeout(() => setShakeIntensity(0), 300);

      if (newPower === 0) setGameOver(true);

      return newPower;
    });

    setTimeout(() => setHitEffect(false), 150);
    setTimeout(() => setFlashBackground(false), 100);

    const newShot = {
      id: Date.now(),
      left: 100,
      top: 0, 
    };
    setShots((prev) => [...prev, newShot]);
    setTimeout(
      () => setShots((prev) => prev.filter((s) => s.id !== newShot.id)),
      500
    );
  };

  const handleNewGame = () => {
    localStorage.removeItem("inventory");
    setMysticCharge(0);
    setWizardPower(100);
    setShakeIntensity(0);
    setHitEffect(false);
    setDamageNumbers([]);
    setFlashBackground(false);
    setSparks([]);
    setGameOver(false);

    navigate("/");
  };

  const getWizardImage = () => {
    if (wizardPower === 0) return defeatedWizard;
    if (wizardPower <= 40) return mostlyDefeatedWizard;
    if (wizardPower <= 70) return slightlyDefeatedWizard;
    return fullWizard;
  };

  return (
    <div
      className={`wizard-battle-container ${flashBackground ? "flash-bg" : ""}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {gameOver && (
        <div className="game-over-overlay">
          <h1>YOU WIN!</h1>
          <p>You are the new math wizard!</p>
          <ArcadeButton name="NEW GAME" onClick={handleNewGame} />
        </div>
      )}
      <div className="wizard-battle-close-button">
        <ArcadeButton name="GO HOME" onClick={() => navigate("/")} />
      </div>
      <div className="wizard-battle-powerbars">
        <div
          className="battle-powerbar-wrapper"
          style={{ position: "relative" }}
        >
          <PowerBar value={mysticCharge} />
          {shots.map((shot) => (
            <div
              key={shot.id}
              className="mystic-shot"
              style={{
                position: "absolute",
                left: `${shot.left}px`,
                top: `${shot.top}px`,
              }}
            />
          ))}
        </div>
        <div className="wizard-powerbar-wrapper">
          <WizardPowerBar value={wizardPower} />
        </div>
      </div>

      <div
        className={`wizard-image-wrapper ${
          shakeIntensity ? `shake shake-${shakeIntensity}` : ""
        } ${hitEffect ? "hit-effect" : ""}`}
      >
        <img src={getWizardImage()} alt="Wizard" className="wizard-image" />

        {damageNumbers.map((numObj, index) => (
          <span
            key={numObj.id}
            className="damage-number"
            style={{ left: `${80 + index * 10}px`, top: `30px` }}
          >
            -{numObj.value}
          </span>
        ))}

        {sparks.map((spark) => (
          <span
            key={spark.id}
            className="spark"
            style={{ left: spark.x, top: spark.y }}
          />
        ))}
      </div>

      <div className="battle-button-container">
        {mysticCharge > 0 && wizardPower > 0 ? (
          <ArcadeButton name="BATTLE WIZARD" onClick={handleBattleClick} />
        ) : (
          !gameOver && <p className="after-battle-text"></p>
        )}
      </div>
    </div>
  );
}
