import React from "react";
import { useState } from "react";
import Numbers from "./numbers";
import "./about.css";
import Confetti from "react-confetti";

function generateAllNewDice() {
  return new Array(10)

    .fill(0)
    .map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: crypto.randomUUID(),
    }));
}

export default function About() {
  const [dice, setDice] = useState(() => generateAllNewDice());

  const GameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  function rollDeice() {
    if (!GameWon)
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    else setDice(generateAllNewDice());
  }

  function hold(id) {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const NewDice = dice.map((diceObj) => (
    <Numbers
      key={diceObj.id}
      number={diceObj.value}
      isHeld={diceObj.isHeld}
      id={diceObj.id}
      hold={() => hold(diceObj.id)}
    />
  ));

  return (
    <div className="tenzies">
      {GameWon && <Confetti />}
      <div className="about--container">
        <div className="top">
          <h1 className="about--title">Tenzies</h1>
          <h1 className="about">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </h1>
        </div>

        <div className="mid">{NewDice}</div>

        <div className="buttom">
          <div className="roll">
            <button onClick={rollDeice} className="roll-">
              {GameWon ? "newgame" : "Roll"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
