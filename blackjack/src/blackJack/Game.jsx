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

    if (playerScore > 21) {
      setResult("Perdu"); 
    } else if (botScore > 21 || playerScore > botScore) {
      setResult("Gagné");  
      setMontant(montant+(mise*2))
    } else if (playerScore < botScore) {
      setResult("Perdu"); 
    } else {
      setResult("Égalité");
      setMontant(montant+mise)
    }
  };

  useEffect(() => {
    if (playerFinished && !botFinished) {
      const botPlay = setInterval(() => {
        setBotHand((prevHand) => {
          const currentScore = getScore(prevHand);
  
          if (currentScore >=16) {
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
        result === "Gagné" ? "win" :
        result === "Perdu" ? "lose" : "draw";
  
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
    <div><h1 style={{
      textAlign: "center",
      fontFamily: "cursive",
      fontSize: "3rem",
      margin: "20px 0",
      textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
    }}>
      Black Jack
    </h1>
    <div className="jeu">
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
    </div>
  );
};

export default Game;
