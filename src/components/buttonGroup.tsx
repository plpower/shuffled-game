import React, { Dispatch, SetStateAction, useEffect } from "react";
import "./ButtonGroup.css"; // Import your CSS file for styling
import { Guess } from "../game-engine/Guess";
import { WordWithPosition } from "../game-engine/shuffleObject";

interface ButtonGroupProps {
  originalWords: string[];
  words: WordWithPosition[];
  setGuess: Dispatch<SetStateAction<Guess>>;
  guess: Guess;
  setIndex: Dispatch<SetStateAction<number>>;
  idx: number;
  isVowel: boolean;
  correct: number[];
  selectedButton: number;
  setSelectedButton: Dispatch<SetStateAction<number>>;
}

const allColors = [
  "#EF767A",
//   "#456978",
  "#49BEAA",
//   "#49DCB1",
  "#EEB868",
  "#51af6a",
  "#ff69b4",
  "#1e90ff",
  "#556b2f",
  "#ff4559",
];


const ButtonGroup: React.FC<ButtonGroupProps> = ({
  originalWords,
  words,
  setGuess,
  guess,
  setIndex,
  isVowel,
  correct,
  selectedButton,
  setSelectedButton
}) => {

  const handleButtonClick = (id: number) => {
    setSelectedButton(id === selectedButton ? 0 : id);
  };

  return (
    <div className="button-group-container">
      {words.map((button, index) => (
        // !correct.includes(button.originalPosition) &&
        <button
          key={index + 1}
          //   onAnimationEnd={() => setWobble(0)}
          className={`button ${index + 1 === selectedButton ? "selected" : ""}`}
          disabled={correct.includes(button.originalPosition)}
          style={{
            backgroundColor: correct.includes(button.originalPosition)
              ? allColors[button.originalPosition]
              : "none",
            color:
              correct.includes(button.originalPosition) ||
              index + 1 === selectedButton
                ? "white"
                : "black",
          }}
          onClick={() => {
            if (isVowel) {
              setIndex(index);
              setGuess({ ...guess, v: button.originalPosition });
            } else {
              setGuess({ ...guess, c: button.originalPosition });
            }
            handleButtonClick(index + 1);
          }}
        >
          <p>{button.word}</p>
          {correct.includes(button.originalPosition) && (
            <p>{originalWords[button.originalPosition]}</p>
          )}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
