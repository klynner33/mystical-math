import { useEffect, useRef } from "react";
import Button from "./Button";

export default function FeedbackModal({
  answerDisplay,
  onClick,
  name,
  allowEnter = true,
}) {
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Enter" && allowEnter) {
        onClick();
      }
    }

    const timer = setTimeout(() => {
      window.addEventListener("keydown", handleKeyDown);
      buttonRef.current?.focus();
    }, 150);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClick, allowEnter]);

  return (
    <div className="feedback-modal">
      <p>{answerDisplay}</p>
      <Button ref={buttonRef} name={name} onClick={onClick} />
    </div>
  );
}
