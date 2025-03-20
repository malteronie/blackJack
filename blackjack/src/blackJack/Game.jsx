import React, { useState, useEffect } from "react";
import BotHand from "./Cards/BotHand";
import Hand from "./Cards/Hand";
import Money from "./Money";

const Game = () => {
  const types = ["♠", "♥", "♦", "♣"];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

  const [cards, setCards] = useState([]);
  const [botHand, setBotHand] = useState([]);
  const [isStart, setStart] = useState(false);
  const [playerFinished, setPlayerFinished] = useState(false);
  const [botFinished, setBotFinished] = useState(false);
  const [result, setResult] = useState("");
  const [montant, setMontant] = useState(5000);
  const [mise, setMise] = useState(1);

  const getRandomCard = () => {
    const type = types[Math.floor(Math.random() * types.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { value, type };
  };

  const startGame = () => {
    if (mise > montant) return;

    setStart(true);
    setPlayerFinished(false);
    setBotFinished(false);
    setResult("");
    setCards([getRandomCard(), getRandomCard()]);
    setBotHand([getRandomCard(), getRandomCard()]);
    setMontant(montant - mise);
  };

  const hit = () => {
    const newHand = [...cards, getRandomCard()];
    setCards(newHand);

    if (getScore(newHand) > 21) {
      setPlayerFinished(true);
    }
  };

  const getScore = (hand) => {
    let score = 0;
    let nbrAs = 0;

    hand.forEach((card) => {
      if (["J", "Q", "K"].includes(card.value)) {
        score += 10;
      } else if (card.value === "A") {
        score += 11;
        nbrAs++;
      } else {
        score += Number(card.value);
      }
    });

    while (score > 21 && nbrAs > 0) {
      score -= 10;
      nbrAs--;
    }

    return score;
  };

  const stay = () => {
    setPlayerFinished(true);
  };

  const checkWinner = () => {
    const playerScore = getScore(cards);
    const botScore = getScore(botHand);

    if (playerScore > 21) {
      setResult("Perdu 😭");
    } else if (botScore > 21 || playerScore > botScore) {
      setResult("Gagné 🎉");
      setMontant((prev) => prev + mise * 2); // Correction du gain
    } else if (playerScore < botScore) {
      setResult("Perdu 😭");
    } else {
      setResult("Égalité 🤝");
      setMontant((prev) => prev + mise); // Correction du remboursement
    }
  };

  useEffect(() => {
    if (playerFinished && !botFinished) {
      const botPlay = setInterval(() => {
        setBotHand((prevHand) => {
          const currentScore = getScore(prevHand);
  
          if (currentScore >= 15) {
            clearInterval(botPlay); // Stopper le bot
            setBotFinished(true);
            setStart(false);
            return prevHand; // Ne pas piocher
          }
  
          return [...prevHand, getRandomCard()]; // Ajouter une carte si score < 15
        });
      }, 1000);
  
      return () => clearInterval(botPlay);
    }
  }, [playerFinished, botFinished]);

  useEffect(() => {
    if (botFinished) {
      checkWinner();
    }
  }, [botFinished]);
  
  return (
    <div>
      <p>{result}</p>

      <Money
        increase={() => setMise(mise + 1)}
        isStart={isStart}
        lower={() => setMise(Math.max(1, mise - 1))}
        montant={montant}
        mise={mise}
        setMise={setMise}
      />
      {(!isStart || (playerFinished && botFinished)) && (
        <button onClick={startGame} className="newButton">Nouvelle Partie</button>
      )}
      <div className="game">
      
      <center>
        <BotHand cards={botHand} isFinished={botFinished} getScore={botFinished ? getScore(botHand) : "?"} />
      </center>

      

      {isStart && !playerFinished && (
        <>
          <button onClick={hit} className="button">Hit</button>
          <button onClick={stay} className="button">Stay</button>
        </>
      )}

      <Hand cards={cards} getScore={getScore(cards)} />


    </div>
    </div>
  );
};

export default Game;
