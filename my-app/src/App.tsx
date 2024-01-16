import React, { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineCloseCircle } from "react-icons/ai";
import ButtonGroup from "./components/buttonGroup";
import "./App.css";
import NytButtonGroup from "./components/checkGuess/checkGuessButtons";
import { Guess, GuessHistory } from "./game-engine/Guess";
import {
  WordWithPosition,
  shuffleVowels,
  splitWordsIntoVowelsAndConsonants,
} from "./game-engine/shuffleObject";
import getCorrectList from "./game-engine/getCorrectList";
import Cookies from "js-cookie";

const words = [
  "even",
  "lint",
  "scared",
  "pieces",
  "doubt",
  "dream",
  "howl",
  "poured",
];


const App = () => {
  const [idx, setIndex] = useState<number>(-1);
  const [guess, setGuess] = useState<Guess>({ v: -1, c: -1 });
  const [strikes, setStrikes] = useState<Guess[]>([]);
  const [displayVowels, setDisplayVowels] = useState<WordWithPosition[]>([]);
  const [displayConsonants, setDisplayConsonants] = useState<
    WordWithPosition[]
  >([]);
  const [, setIsCorrect] = useState<boolean>(false);
  const [correctpositions, setCorrectPsns] = useState<number[]>([]);
  const [selectedVButton, setSelectedVButton] = useState<number>(0);
  const [selectedCButton, setSelectedCButton] = useState<number>(0);

  useEffect(() => {
    const storedVowels = JSON.parse(
      localStorage.getItem("displayVowels") || "[]"
    );
    const storedConsonants = JSON.parse(
      localStorage.getItem("displayConsonants") || "[]"
    );
    if (storedVowels && storedVowels[0] && storedConsonants && storedConsonants[0]) {
      console.log("gettig from local storage")
      setDisplayVowels(storedVowels);
      setDisplayConsonants(storedConsonants);
      const storedStrikes = JSON.parse(localStorage.getItem("strikes") || "[]");
      setStrikes(storedStrikes);
      const storedcorrectpositions = JSON.parse(
        localStorage.getItem("correctpositions") || "[]"
      );
      setStrikes(storedcorrectpositions);
    } else {
      const { vowels, consonants } = splitWordsIntoVowelsAndConsonants(words);
      const shuffledVowels = shuffleVowels(vowels);
      setDisplayVowels(shuffledVowels);
      setDisplayConsonants(consonants);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("strikes", JSON.stringify(strikes));
    Cookies.set("strikes", JSON.stringify(strikes), { expires: 7 });
    // alert(Cookies.get("strikes"));
  }, [strikes]);
  useEffect(() => {
    localStorage.setItem("displayVowels", JSON.stringify(displayVowels));
  }, [displayVowels]);
  useEffect(() => {
    localStorage.setItem(
      "setDisplayConsonants",
      JSON.stringify(displayConsonants)
    );
  }, [displayConsonants]);
  useEffect(() => {
    localStorage.setItem("correctpositions", JSON.stringify(correctpositions));
  }, [correctpositions]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shuffled</h1>
        <p>Match the vowels and consonants</p>
        <div className="button-container">
          <ButtonGroup
            originalWords={words}
            words={displayVowels}
            setGuess={setGuess}
            guess={guess}
            setIndex={setIndex}
            idx={idx}
            isVowel={true}
            correct={correctpositions}
            selectedButton={selectedVButton}
            setSelectedButton={setSelectedVButton}
          />
          <ButtonGroup
            originalWords={words}
            words={displayConsonants}
            setGuess={setGuess}
            guess={guess}
            setIndex={setIndex}
            idx={idx}
            isVowel={false}
            correct={correctpositions}
            selectedButton={selectedCButton}
            setSelectedButton={setSelectedCButton}
          />
        </div>
        <div className="button-container">
          {[...Array(6 - strikes.length)].map((x, i) => (
            <AiOutlineCloseCircle style={{ color: "#686767" }} key={i} />
          ))}
          {[...Array(strikes.length)].map((x, i) => (
            <AiFillCloseCircle style={{ color: "#686767" }} key={i} />
          ))}
        </div>

        {/* <button onClick={GetCookie()}></button> */}

        <NytButtonGroup
          words={words}
          guess={guess}
          idx={idx}
          setIsCorrect={setIsCorrect}
          strikes={strikes}
          setStrikes={setStrikes}
          correctPsns={correctpositions}
          setCorrectPsns={setCorrectPsns}
          displayVowels={displayVowels}
          setDisplayVowels={setDisplayVowels}
          displayConsonants={displayConsonants}
          setDisplayConsonants={setDisplayConsonants}
          selectedCButton={selectedCButton}
          setSelectedCButton={setSelectedCButton}
          selectedVButton={selectedVButton}
          setSelectedVButton={setSelectedVButton}
        />
      </header>
    </div>
  );
};

export default App;
