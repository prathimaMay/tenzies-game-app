import "./App.css";
import Dice from "./Dice";
import React, { useState } from "react";
import { useEffect } from "react";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValues = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValues) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: i + 1,
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return newDice;
  }

  function handleClick() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? { ...die }
            : {
                ...die,
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: die.id,
              };
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice);
    }
  }

  function clickDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : { ...die };
      })
    );
  }

  const diceElements = dice.map((element) => (
    <Dice
      key={element.id}
      value={element.value}
      isHeld={element.isHeld}
      clickDice={() => clickDice(element.id)}
    />
  ));

  return (
    <main className="app">
      {tenzies && <Confetti />}
      <h1 className="title">TENZIES</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each dice to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="dice-button" onClick={handleClick}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
