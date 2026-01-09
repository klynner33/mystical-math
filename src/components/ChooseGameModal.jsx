import { useNavigate } from "react-router-dom";
import Button from "../components/Button";


export default function ChooseGameModal({ onClose }) {
  const navigate = useNavigate();
  return (
    <>
      <main>
        <div className="choose-operation-container">
          <button className="close-modal-btn" onClick={onClose}>
            ✕
          </button>

          <h2 className="choose-operation-text">Click one to start!</h2>
          <div className="button-container">
            <div className="add-subtract-buttons">
              <Button
                name="Addition"
                onClick={() => navigate("/addition-game")}
              />
              <Button
                name="Subtraction"
                onClick={() => navigate("/subtraction-game")}
              />
            </div>
            <div className="multiply-divide-buttons">
              <Button
                name="Multiplication"
                onClick={() => navigate("/multiplication-game")}
              />
              <Button
                name="Division"
                onClick={() => navigate("/division-game")}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
