import React, { useState,useEffect} from "react"
import Hand from "./Hand"
import BotHand from "./BotHand"

const Game = () => {
  const types = ["♠", "♥", "♦", "♣"]
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]

  const [cards, setCards] = useState([])
  const [isStart, setStart] = useState(false)
  const [result, setResult] = useState("")
  const [botHand, setBotHand] = useState([])
  const [botFinish, setBotFinish] = useState(false)

//botGame
  const botGame = () => {
  setBotHand([getRandomCard(), getRandomCard()]);
  setBotFinish(false)
  };

//getRandomCard
  const getRandomCard = () => {
    const type = types[Math.floor(Math.random() * types.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { value, type };
  };

//startGame 
  const startGame = () => {
    setStart(true);
    setCards([getRandomCard(), getRandomCard()]);
    botGame()
  };

//hit
  const hit = () => {
    setCards([...cards, getRandomCard()]);
  };

//stay
  const stay = () => {
    if (botFinish===true){
    
      const finalPlayerScore = getScore(cards);
      const finalBotScore = getScore(botHand);
    
      // Vérification stricte des résultats
      if (finalPlayerScore > 21 && finalBotScore > 21) {
        setResult("Égalité, vous avez tous les deux dépassé !");
      } else if (finalPlayerScore > 21) {
        setResult("Dommage, tu as perdu !");
      } else if (finalBotScore > 21) {
        setResult("Bravo, tu as gagné !!");
      } else if (finalPlayerScore > finalBotScore) {
        setResult("Bravo, tu as gagné !!");
      } else if (finalPlayerScore < finalBotScore) {
        setResult("Dommage, tu as perdu !");
      } else {
        setResult("Égalité !");
      }
      setStart(false)
      
    }
  }

//getScore
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

//const Score
  const botScore = getScore(botHand);
  const playerScore = getScore(cards);


//useEffect
  useEffect (() => {
    if (getScore(botHand)<15){
      setTimeout(() => {
        setBotHand([...botHand, getRandomCard()]);
      }, 1000);
    
    } else {
      setBotFinish(true)
    }
  }, [botScore, botHand])

  useEffect(() => {
    if (isStart) {
      if (playerScore > 21){
        stay()
      }
    }
  }, [playerScore, botScore, isStart]);


//return
  return (
    <div className="game">
      {!isStart && <div>{result}</div>
        
      }
      <div className="flex">
        <BotHand className="" cards={botHand} getScore={botScore} />
        {!isStart && <button onClick={startGame} className="button">Jouer</button>}
        <div className="action">
        {isStart && <button onClick={() => hit()} className="button">Hit</button>}
        {isStart && <button onClick={() => stay()} className="button">Stay</button>}
        </div>
        <Hand cards={cards} getScore={playerScore} />
      </div><br />
      
    </div>
  );
};

export default Game;