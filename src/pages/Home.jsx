import { useState } from "react"
import Button from "../components/Button";
import ChooseGameModal from "../components/ChooseGameModal";
import Footer from "../components/Footer"

export default function Home() {
    const [chooseGameModal, setChooseGameModal] = useState("modal-hidden");

    function openChooseGameModal() {
        setChooseGameModal("modal");
    }
    
  return (
    <div className="main-screen">
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
