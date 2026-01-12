import hero from "../assets/mystical-math-hero.png";
import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PowerBar from "./PowerBar";

export default function Header() {
  const savedInventory = JSON.parse(localStorage.getItem("inventory")) || [];

  const inventoryCharge = savedInventory.reduce(
    (total, item) => total + (item.mysticCharge || 0),
    0
  );

  const [mysticCharge, setMysticCharge] = useState(inventoryCharge);

  useEffect(() => {
    setMysticCharge(inventoryCharge);
  }, [inventoryCharge]);

  function fillMysticCharge() {
    setMysticCharge(100);
  }

  return (
    <div className="header">
      <Link to="/">
        <img src={hero} className="header-hero" />
      </Link>

      <div className="nav">
        <h1>Practice your math facts to earn magical creatures and items!</h1>
        <div className="links-powerbar-container">
          <div className="hamb-menu-container">
            <button className="nav-hamb-menu">☰</button>
          </div>
          <ul className="nav-links">
            <li className="home-link">
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/addition-game">Addition</NavLink>
            </li>
            <li>
              <NavLink to="/subtraction-game">Subtraction</NavLink>
            </li>
            <li>
              <NavLink to="/multiplication-game">Multiplication</NavLink>
            </li>
            <li>
              <NavLink to="/division-game">Division</NavLink>
            </li>
          </ul>
          <div className="header-powerbar-container">
            <PowerBar value={mysticCharge} onCheatFill={fillMysticCharge} />
          </div>
        </div>
      </div>

      {mysticCharge >= 100 && (
        <>
          <div className="overlay-blocker"></div>

          <div className="battle-overlay">
            <h1>Your Mystic Charge is Full!</h1>
            <Link to="/wizard-battle">
              <button className="battle-button">Battle the Wizard!</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
