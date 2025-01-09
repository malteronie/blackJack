import React, { useState,useEffect } from "react";
import Hand from "./Hand";
import BotHand from "./BotHand";

const Game = () => {
    const types = ["♠", "♥", "♦", "♣"];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    const [cards, setCards] = useState([]);
    const [isStart, setStart] = useState(false);
    const [result, setResult] = useState(false);
    const [botHand, setBotHand] = useState([])


    const botGame = () => {
    setBotHand([getRandomCard(), getRandomCard()]);
    };


  const getRandomCard = () => {
    const type = types[Math.floor(Math.random() * types.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { value, type };
  };

  const getScore = (player) => {
    let score = 0;
    let nbrAs=0;

    player.forEach((card) => {
      if (card.value === "J" || card.value === "Q" || card.value === "K") {
          score += 10;
      } else if (card.value === "A") {
          if (score > 10 ){
              score += 1
          } else {
              nbrAs += 1
              score += 11
          }

      } else {
          score += card.value;
      }

      while (score >21 && nbrAs > 0){
        nbrAs--
        score -=10
      }
    });
    return score;
  }


  const botScore = getScore(botHand);
  const playerScore = getScore(cards);


  useEffect(() => {
    if (isStart) {
      if (playerScore > 21){
        setStart(false)
      }else if (playerScore===21){
        setStart(false)
        setResult(true)
    }
    }
  }, [playerScore, isStart]);

  const startGame = () => {
    setStart(true);
    setCards([getRandomCard(), getRandomCard()]);
    botGame()
  };

  const takeCard = () => {
    setCards([...cards, getRandomCard()]);
  };





  return (
    <div className="game">
      <BotHand cards={botHand} getScore={botScore} />
      {!isStart && <button onClick={startGame}>Jouer</button>}
      {isStart && <button onClick={takeCard}>Prendre une carte</button>}
      <Hand cards={cards} getScore={playerScore} />
      {!isStart && (
        <div>{result ? "T'as gagné !" : "T'as perdu !"}</div>
      )}
    </div>
  );
};

export default Game;