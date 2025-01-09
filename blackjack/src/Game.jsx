import React, { useState } from "react";
import Hand from "./Hand";

const Game = () => {
  const types = ["♠", "♥", "♦", "♣"];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

  const [cards, setCards] = useState([]);
  const [isStart, setStart] = useState(false);
  const [result, setResult] = useState();

  const getRandomCard = () => {
    const type = types[Math.floor(Math.random() * types.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { value, type };
  };

  const getScore = () => {
    let score = 0;
    cards.forEach((card) => {
        if (card.value === "J" || card.value === "Q" || card.value === "K") {
            score += 10;
        } else if (card.value === "A") {
            if (score > 10 ){
                score += 1
            } else {
                score += 11
            }
        } else {
            score += card.value;
        }

        if (score > 21){
            setStart(false)
        }
    });
    return score;
  };

  const startGame = () => {
    setStart(true);
    setCards([getRandomCard(), getRandomCard()]);
  };

  const takeCard = () => {
    setCards([...cards, getRandomCard()]);
  };

  return (
    <div className="game">
      {!isStart && <button onClick={startGame}>Jouer</button>}
      {isStart && <button onClick={takeCard}>Prendre une carte</button>}
      <Hand cards={cards} getScore={getScore} />
      {/* {isStart && ( */}
        {/* <div>{result ? "T'as gagné !" : "T'as perdu !"}</div> */}
      {/* )} */}
    </div>
  );
};

export default Game;