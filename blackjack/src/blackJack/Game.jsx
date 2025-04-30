import React, { useState, useEffect } from "react";
import BotHand from "./Cards/BotHand";
import Hand from "./Cards/Hand";
import Money from "./Money";
import { API_URL } from "../services/config";

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
  const [actions, setActions] = useState([]);

  const getRandomCard = () => {
    const type = types[Math.floor(Math.random() * types.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { value, type };
  };

  const startGame = () => {
    if (mise > montant) return;
    setActions([]);
    setStart(true);
    setPlayerFinished(false);
    setBotFinished(false);
    setResult("");
    setCards([getRandomCard(), getRandomCard()]);
    setBotHand([getRandomCard(), getRandomCard()]);
    setMontant(montant - mise);
  };

  const hit = () => {
    setActions(prev => [...prev, "Hit"]);
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
    setActions(prev => [...prev, "Stay"]);
    setPlayerFinished(true);
  };

  const checkWinner = () => {
    const playerScore = getScore(cards);
    const botScore = getScore(botHand);

    if (playerScore > 21 && botScore > 21) {
      setResult("Égalité 🤝");  // Si les deux dépassent 21, c'est une égalité
    } else if (playerScore > 21) {
      setResult("Perdu 😭");  // Si le joueur dépasse 21, il perd
    } else if (botScore > 21 || playerScore > botScore) {
      setResult("Gagné 🎉");  // Si le bot dépasse 21 ou le joueur a un meilleur score
    } else if (playerScore < botScore) {
      setResult("Perdu 😭");  // Si le bot a un meilleur score
    } else {
      setResult("Égalité 🤝");  // Si les scores sont égaux
    }
  };

  useEffect(() => {
    if (playerFinished && !botFinished) {
      const botPlay = setInterval(() => {
        setBotHand((prevHand) => {
          const currentScore = getScore(prevHand);
  
          if (currentScore >=2) {
            clearInterval(botPlay);
            setBotFinished(true);
            setStart(false);
            return prevHand;
          }
  
          return [...prevHand, getRandomCard()];
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
  


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    fetch(API_URL+"/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      if (data.solde !== undefined) {
        setMontant(data.solde);
      }
    });
  }, []);

  useEffect(() => {
    if (result) {
      const playerScore = getScore(cards);
      const dealerScore = getScore(botHand);
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.warn("Aucun token trouvé, utilisateur non authentifié.");
        return;
      }
  
      const mappedResult =
        result === "Gagné 🎉" ? "win" :
        result === "Perdu 😭" ? "lose" : "draw";
  
      console.log("📤 Envoi historique :", {
        result: mappedResult,
        playerScore,
        dealerScore,
        actions
      });
  
      fetch(API_URL+"/api/game/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          result: mappedResult,
          playerScore,
          dealerScore,
          actions,
          mise
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log("✅ Historique enregistré :", data);
        if (data.solde !== undefined) {
          setMontant(data.solde);
        }
      })
      
      .catch(err => console.error("❌ Erreur API historique :", err));
    }
  }, [result]);


  return (
    <div>
      <p>{result}</p>
<center>
      <Money
        increase={() => setMise(mise + 1)}
        isStart={isStart}
        lower={() => setMise(Math.max(1, mise - 1))}
        montant={montant}
        mise={mise}
        setMise={setMise}
      /></center>
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
