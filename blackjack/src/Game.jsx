import React, { useState,useEffect} from "react"
import Hand from "./Hand"
import BotHand from "./BotHand"

const Game = () => {
  const types = ["♠", "♥", "♦", "♣"]  //Variable pour valeur et type de carte
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]

  //Initialiser les variables utilisant useState
  const [cards, setCards] = useState([])
  const [firstSplit, setFirstSplit] = useState([])
  const [secondSplit, setSecondSplit] = useState([])

  const [isStart, setStart] = useState(false)
  const [result, setResult] = useState("")
  const [result2, setResult2] = useState("")
  
  const [botHand, setBotHand] = useState([])
  const [botFinish, setBotFinish] = useState(false)
  
  const [canBeSplited, setCanBeSplited] = useState(false)
  const [isSplited, setIsSplited] = useState(false)
  const [startFirstSplit, setStartFirstSplit] = useState(false)
  const [startSecondSplit, setStartSecondSplit] = useState(false)  

//botGame
  const botGame = () => {
  setBotHand([getRandomCard(), getRandomCard()]);  //Ajoute les cartes à la main du joueur
  setBotFinish(false) 
  };

//getRandomCard
  const getRandomCard = () => {
    const type = types[Math.floor(Math.random() * types.length)];  //Tire un type de carte au hasard
    const value = values[Math.floor(Math.random() * values.length)]; //Une valeur de carte au hasard
    // const value = 10
    return { value, type }; //Retourne les props de la carte
  };

//startGame 
  const startGame = () => {
    setStart(true);   //La game a commencé
    setCards([getRandomCard(), getRandomCard()]); //Ajoute les cartes
    botGame()
    setFirstSplit([])
    setSecondSplit([])
    setIsSplited(false)
  };

//hit
  const hit = (card, setCard) => {
    if (botFinish===true){   //Si le bot a fini de jouer
      setCard([...card, getRandomCard()]);  //Ajoute une carte a la main du  joueur
    }
  };

//stay
  const stay = (card, setGame, setMessage) => {
    if (botFinish===true){  //Si bot à fini de jouer
    
      const finalPlayerScore = getScore(card); //Calculer le score final du joueur et du bot
      const finalBotScore = getScore(botHand);
      console.log(finalBotScore)
      console.log(finalPlayerScore)
      if (finalPlayerScore > 21 && finalBotScore > 21) {   //Conditions de victoire ou défaite
        setMessage("Égalité, vous avez tous les deux dépassé !");
      } else if (finalPlayerScore > 21) {
        setMessage("Dommage, tu as perdu !");
      } else if (finalBotScore > 21) {
        setMessage("Bravo, tu as gagné !!");
      } else if (finalPlayerScore > finalBotScore) {
        setMessage("Bravo, tu as gagné !!");
      } else if (finalPlayerScore < finalBotScore) {
        setMessage("Dommage, tu as perdu !");
      } else {
        setMessage("Égalité !");
      }
      setGame(false)  //Statut du jeu en non lancé
      setCanBeSplited(false)
    }
    
  }

//split
  const split = () => {
    setIsSplited(true)
    setCanBeSplited(false)
    setFirstSplit([cards[0], getRandomCard()])
    setSecondSplit([cards[1], getRandomCard()])
    setStartFirstSplit(true)
    setStartSecondSplit(true)
  }

//getScore
  const getScore = (player) => {
    let score = 0;    //Initialise les variables score et nbrAs
    let nbrAs=0;

    player.forEach((card) => {   //Pour chaque carte
      if (card.value === "J" || card.value === "Q" || card.value === "K") {  //Si la carte est une tête
          score += 10;            //Ajoute 10 au score
      } else if (card.value === "A") {        //Si la carte est un As
        if (score > 10 ){       //Si le score est supérieur à 10 
          score += 1            // l'As vaut 1
        } else {              //Sinon
          nbrAs += 1            //Le nombre d'As valant 11 augmente
          score += 11           //Ajoute 11 au score
        }
      } else {      //Si la carte n'est pas une tête
        score += card.value;  //Ajoute la valeur de la carte au score
      }

      while (score >21 && nbrAs > 0){     //Tant que le score est >21 et que le nbr d'As valant 11 est >1
        nbrAs--         //Réduire le nbr d'As valant 11 de 1
        score -=10      //Réduire le score de 10
      }
    });
    return score;   //Retourner le score
  }

//const Score
  const botScore = getScore(botHand);
  const playerScore = getScore(cards);
  const firstSplitScore = getScore(firstSplit);
  const secondSplitScore= getScore(secondSplit);


//useEffect

  useEffect (() => {     
    if(!startFirstSplit && !startSecondSplit && isSplited){
      setStart(false)
    }
  }, [startFirstSplit, startSecondSplit, isSplited])

  useEffect (() => {     //Mode soft
    if (getScore(botHand)<15 && isStart){   //Si le bot a - de 15
      setTimeout(() => {
        setBotHand([...botHand, getRandomCard()]); //Lui donner une carte au bout d'1 seconde
      }, 1000);
    
    } else {
      setBotFinish(true)   //S'il a plus de 15 son tour se termine
    }
  }, [botScore, botHand, isStart])   //Dépendance pr useEffect

  
  useEffect(() => {
    if (isStart) {      //Si la game est lancée
      if (playerScore > 21){   //Et que le joueur dépasse 21
        stay(cards, setStart, setResult)  //Appel de la fonction stay 
      }
      if (isSplited) {
        if (firstSplitScore > 21){   //Et que le score du premier packet après le split > 21
          stay(firstSplit, setStartFirstSplit, setResult)  //Appel de la fonction stay 
        }
        if (secondSplitScore > 21){   //Et que le score du second packet apres le split > 21
          stay(secondSplit, setStartSecondSplit, setResult2)  //Appel de la fonction stay 
        }
      }
    }
  }, [playerScore, firstSplitScore, secondSplitScore, isStart]);

  useEffect(() => {
    if (isStart) {      //Si la game est lancée
      if (cards.length===2 && cards[0].value===cards[1].value){   //Que le joueur possède 2 carte
         //et que les cartes sont de la même valeur
          console.log(cards.length)
          setCanBeSplited(true)   //canBeSplited pass true
        
      } else{
        setCanBeSplited(false)
      }
    }
  }, [cards, isStart]);


//return
  return (
    <div className="game">
        <center><BotHand className="" cards={botHand} getScore={botScore} /></center><br /><br />
      
      {!isStart && <button onClick={startGame} className="button">Jouer</button>}
      {canBeSplited && <button onClick={split} className="button">Split</button>}<br />
        {!isSplited && <div>
          <Hand cards={cards} getScore={playerScore} setCard={setCards} hit={hit} stay={stay} setGame={setStart} result={result} isStart={isStart} setText={setResult}/><br />
        </div>}
        {isSplited && 
          <div style={{'display' : 'flex'}}>
            <Hand cards={firstSplit} getScore={firstSplitScore} setCard={setFirstSplit} hit={hit} stay={stay} setGame={setStartFirstSplit} isStart={startFirstSplit} result={result} setText={setResult}/><br />
            <Hand cards={secondSplit} getScore={secondSplitScore} setCard={setSecondSplit} hit={hit} stay={stay} setGame={setStartSecondSplit} isStart={startSecondSplit} result={result2} setText={setResult2}/><br />
          </div>
        }
      <br />
      
    </div>
  );
};

export default Game;


//mise
//cacher la main du bot