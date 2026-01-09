import { useState } from "react"
import Button from "../components/Button";
import ChooseGameModal from "../components/ChooseGameModal";
import Footer from "../components/Footer";
import KittyImg from "../assets/mystical-math-kitty.png";
import TitleImg from "../assets/mystical-math-title.png";

export default function Home() {
    const [chooseGameModal, setChooseGameModal] = useState("modal-hidden");

    function openChooseGameModal() {
        setChooseGameModal("modal");
    }
    
  return (
    <div className="main-screen">
      <div className="mobile-hero">
        <div className="title-img-container">
          <img src={TitleImg} alt="Mystical Math Title" className="title-img" />
        </div>
        <div className="kitty-img-container">
          <img src={KittyImg} alt="Mystical Math Kitty" className="kitty-img" />
        </div>
      </div>
      {chooseGameModal === "modal-hidden" && (
        <div className="play-button">
          <Button
            name="Play"
            onClick={() => {
              openChooseGameModal();
            }}
          />
        </div>
      )}

      {chooseGameModal === "modal" && (
        <div className="choose-game-modal">
          <ChooseGameModal onClose={() => setChooseGameModal("modal-hidden")} />
        </div>
      )}
      <Footer />
    </div>
  );
};
