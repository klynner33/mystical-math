import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";
import Button from "./Button.jsx";
import FeedbackModal from "./FeedbackModal.jsx";
import Hint from "./Hint.jsx";
import bronzeChest from "../assets/inventory-images/extra-images/bronze-chest.png";
import bronzeKey from "../assets/inventory-images/extra-images/bronze-key.png";
import woodenDoor from "../assets/inventory-images/extra-images/wooden-door.png";
import inventoryItems from "../data/inventoryImages.js";

export default function GameEngine({ operator, chart, generateNumbers }) {
  const [answerDisplay, setAnswerDisplay] = useState("");
  const [feedbackModal, setFeedbackModal] = useState("modal-hidden");
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(null);
  const [keyText, setKeyText] = useState("");
  const [chestImage, setChestImage] = useState(bronzeChest);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [numbers, setNumbers] = useState(() => generateNumbers());
  const [displayHint, setDisplayHint] = useState("book");
  const [choices, setChoices] = useState([]);
  const keyRef = useRef(null);
  const chestRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 });

  const topNumber = numbers.top;
  const bottomNumber = numbers.bottom;

  const generateChoices = useCallback(() => {
    let correctValue =
      operator === "+"
        ? topNumber + bottomNumber
        : operator === "-"
        ? topNumber - bottomNumber
        : operator === "×"
        ? topNumber * bottomNumber
        : topNumber / bottomNumber;

        correctValue = Math.max(0, Math.floor(correctValue));

   
    const incorrectAnswers = [];
    while (incorrectAnswers.length < 2) {
      let rand = correctValue + Math.floor(Math.random() * 16 - 5); 

      rand = Math.max(0, rand);

      if (rand !== correctValue && !incorrectAnswers.includes(rand)) {
        incorrectAnswers.push(rand);
      }
    }

    const allAnswers = [correctValue, ...incorrectAnswers];
    const shuffled = allAnswers
      .map((a) => ({ value: a, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    setChoices(shuffled);
  }, [topNumber, bottomNumber, operator]);

  useEffect(() => {
    if (feedbackModal === "modal-hidden") {
      generateChoices();
    }
  }, [numbers, feedbackModal, generateChoices]);

  const addToInventory = (item) => {
    const existing = JSON.parse(localStorage.getItem("inventory")) || [];
    if (!existing.some((i) => i.name === item.name)) {
      existing.push(item);
      localStorage.setItem("inventory", JSON.stringify(existing));
    }
  };

  function handleTouchStart(e) {
    const touch = e.touches[0];
    const keyRect = keyRef.current.getBoundingClientRect();
    setTouchOffset({
      x: touch.clientX - keyRect.left,
      y: touch.clientY - keyRect.top,
    });
    setDragging(true);
  }

  function handleTouchMove(e) {
    if (!dragging) return;
    const touch = e.touches[0];
    keyRef.current.style.position = "absolute";
    keyRef.current.style.left = `${touch.clientX - touchOffset.x}px`;
    keyRef.current.style.top = `${touch.clientY - touchOffset.y}px`;
    e.preventDefault(); // prevent scrolling while dragging
  }

  function handleTouchEnd(e) {
    if (!dragging) return;
    setDragging(false);

    const keyRect = keyRef.current.getBoundingClientRect();
    const chestRect = chestRef.current.getBoundingClientRect();

    // Check if key is over chest
    if (
      keyRect.left < chestRect.right &&
      keyRect.right > chestRect.left &&
      keyRect.top < chestRect.bottom &&
      keyRect.bottom > chestRect.top
    ) {
      const reward = getRandomItem();
      if (!reward) {
        setKeyText(
          "You've collected EVERYTHING! You're a true Mystical Master!"
        );
        setKey(null);
        return;
      }

      setChestImage(reward.src);
      setKey(null);
      setKeyText(
        <>
          Congrats! You've unlocked the{" "}
          <span className="item-name">{reward.name}</span>! This will be saved
          in your inventory!
        </>
      );
      addToInventory(reward);
    }
  }

  


  function getRandomItem() {
    const saved = JSON.parse(localStorage.getItem("inventory")) || [];
    const remaining = inventoryItems.filter(
      (item) => !saved.some((earned) => earned.name === item.name)
    );
    if (remaining.length === 0) return null;
    return remaining[Math.floor(Math.random() * remaining.length)];
  }

  function handleChoiceSelect(answer) {
    if (answered) return;

    const correctValue =
      operator === "+"
        ? topNumber + bottomNumber
        : operator === "-"
        ? topNumber - bottomNumber
        : operator === "×"
        ? topNumber * bottomNumber
        : topNumber / bottomNumber;

    if (answer === correctValue) {
      setFeedbackModal("modal");
      setAnswerDisplay("Correct!");

      setScore((prev) => {
        const newScore = prev + 1;

        if (newScore === 10) {
          setKey(bronzeKey);
          setKeyText("Drop the key on the chest to open it!");
          setGameOver(true);
        }

        return newScore;
      });
    } else {
      setFeedbackModal("modal");
      setAnswerDisplay("Incorrect.");
    }

    setAnswered(true);
  }

  function newQuestion() {
    setDisplayHint("book");

    if (score === 10) {
      setScore(0);
      setKey(null);
      setKeyText("");
      setChestImage(bronzeChest);
    }

    setNumbers(generateNumbers());
    setAnswered(false);
    setFeedbackModal("modal-hidden");
    setAnswerDisplay("");
  }

  function sameQuestion() {
    setDisplayHint("book");
    setFeedbackModal("modal-hidden");
    setAnswered(false);
  }

  function resetGame() {
    setDisplayHint("book");
    setScore(0);
    setGameOver(false);
    setKey(null);
    setKeyText("");
    setChestImage(bronzeChest);
    setNumbers(generateNumbers());
    setAnswered(false);
    setFeedbackModal("modal-hidden");
    setAnswerDisplay("");
  }

  return (
    <div className="game-screen">
      <Header />

      <div className="top-info-bar">
        <div className="inventory-link-container">
          <p>Go to my inventory ➔</p>
          <Link to="/inventory">
            <img src={woodenDoor} alt="Wooden Door" className="wooden-door" />
          </Link>
        </div>
        <p className="info-text">
          Gain enough mystic charge from your inventory to battle the math
          wizard!
        </p>
      </div>

      <div className="game-container">
        <div className="score-container">
          <p>Your score: {score}</p>

          <div className="chest-key-container">
            {key && (
              <img
                src={key}
                className="key key-animate"
                draggable={true} // still works on desktop
                onDragStart={(e) =>
                  e.dataTransfer.setData("text/plain", "bronzeKey")
                }
                onTouchStart={(e) => handleTouchStart(e)}
                onTouchMove={(e) => handleTouchMove(e)}
                onTouchEnd={(e) => handleTouchEnd(e)}
                ref={keyRef}
              />
            )}

            <img
              src={chestImage}
              className="chest"
              ref={chestRef}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const item = e.dataTransfer.getData("text/plain");
                if (item === "bronzeKey") {
                  const reward = getRandomItem();
                  if (!reward) {
                    setKeyText(
                      "You've collected EVERYTHING! You're a true Mystical Master!"
                    );
                    setKey(null);
                    return;
                  }

                  setChestImage(reward.src);
                  setKey(null);
                  setKeyText(
                    <>
                      Congrats! You've unlocked the{" "}
                      <span className="item-name">{reward.name}</span>! This
                      will be saved in your inventory!
                    </>
                  );
                  addToInventory(reward);
                }
              }}
            />
          </div>

          <div className="key-text">
            <p>{keyText}</p>
          </div>
        </div>

        <div className="equation-container">
          <p>Get 10 correct answers and earn a key to unlock the chest!</p>

          <div className="equation">
            <div className="equation-numbers">
              <div className="top-number">{topNumber}</div>
              <div>
                <span className="operator">{operator}</span>
                <span className="bottom-number">{bottomNumber}</span>
              </div>
            </div>

            <hr className="equation-line" />

            <div className="multiple-choice">
              {choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoiceSelect(choice)}
                  className="answer-button"
                  disabled={answered || gameOver}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>

          {gameOver ? (
            <Button name="Keep Playing" onClick={resetGame} />
          ) : (
            <Button name="Next Question" onClick={newQuestion} />
          )}
        </div>

        <Hint
          chart={chart}
          displayHint={displayHint}
          setDisplayHint={setDisplayHint}
        />
      </div>

      {feedbackModal === "modal" &&
        (score === 10 ? (
          <FeedbackModal
            answerDisplay="You've earned a key to unlock the chest!"
            onClick={() => setFeedbackModal("modal-hidden")}
            name="Close"
            allowEnter={false}
          />
        ) : answerDisplay === "Correct!" ? (
          <FeedbackModal
            answerDisplay={answerDisplay}
            onClick={newQuestion}
            name="Next Question"
            allowEnter={true}
          />
        ) : (
          <FeedbackModal
            answerDisplay={answerDisplay}
            onClick={sameQuestion}
            name="Try Again"
            allowEnter={true}
          />
        ))}
    </div>
  );
}
