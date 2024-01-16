import React, { Dispatch, SetStateAction } from "react";
import "./checkGuessButtons.css"; // Import your CSS file for styling
import { Guess } from "../../game-engine/Guess";
import { WordWithPosition } from "../../game-engine/shuffleObject";

interface NytButtonGroupProps {
  words: string[];
  guess: Guess;
  strikes: Guess[];
  idx: number;
  setIsCorrect: Dispatch<SetStateAction<boolean>>;
  setStrikes: Dispatch<SetStateAction<Guess[]>>;
  correctPsns: number[];
  setCorrectPsns: Dispatch<SetStateAction<number[]>>;
  displayVowels: WordWithPosition[];
  displayConsonants: WordWithPosition[];
  setDisplayVowels: Dispatch<SetStateAction<WordWithPosition[]>>;
  setDisplayConsonants: Dispatch<SetStateAction<WordWithPosition[]>>;
  selectedCButton: number;
  setSelectedCButton: Dispatch<SetStateAction<number>>;
  selectedVButton: number;
  setSelectedVButton: Dispatch<SetStateAction<number>>;
}

const NytButtonGroup: React.FC<NytButtonGroupProps> = ({
  guess,
  setIsCorrect,
  strikes,
  setStrikes,
  correctPsns,
  setCorrectPsns,
  displayVowels,
  displayConsonants,
  setDisplayVowels,
  setDisplayConsonants,
  selectedCButton,
  setSelectedCButton,
  selectedVButton,
  setSelectedVButton,
}) => {
  function moveItemToTop(position: number): void {
    if (position >= 0 && position <= displayVowels.length) {
      const newVArray = displayVowels.filter(
        (item) => item.originalPosition !== position
      );
      const movedVowel = displayVowels.find(
        (obj) => obj.originalPosition === position
      );
      const newCArray = displayConsonants.filter(
        (item) => item.originalPosition !== position
      );
      const movedConsonant = displayConsonants.find(
        (obj) => obj.originalPosition === position
      );

      console.log(movedVowel, movedConsonant, newCArray, newVArray);

      if (movedVowel && movedConsonant) {
        // Insert the moved item at the beginning of the array
        newVArray.unshift(movedVowel);
        newCArray.unshift(movedConsonant);
        setDisplayVowels(newVArray);
        setDisplayConsonants(newCArray);
      }
    }
  }

  const onCheck = () => {
    if (guess.v === guess.c) {
      setIsCorrect(true);
      setCorrectPsns([...correctPsns, guess.v]);
      moveItemToTop(guess.v); //   moveItemToTop;
      setSelectedVButton(0);
      setSelectedCButton(0);
    } else {
      if (strikes.find((obj) => obj.v === guess.v && obj.c === guess.c)) {
        setSelectedVButton(0);
        setSelectedCButton(0);
      } else {
        setStrikes([...strikes, { v: guess.v, c: guess.c }]);
        setSelectedVButton(0);
        setSelectedCButton(0);
      }
    }
  };

  const onClear = () => {
    setSelectedVButton(0);
    setSelectedCButton(0);
  };

  return (
    <div className="nyt-button-group-container">
      <div className="nyt-button nyt-button-check" onClick={onCheck}>
        Check
      </div>
      <div className="nyt-button nyt-button-clear" onClick={onClear}>
        Clear
      </div>
    </div>
  );
};

export default NytButtonGroup;
