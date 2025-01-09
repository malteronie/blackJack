import React from "react";
import Card from "./Card";

const Hand = () => {
  const types = ["♠", "♥", "♦", "♣"];
  const values = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A",
  ];

  // Fonction pour tirer une carte au hasard
  const getRandomCard = () => {
    const type = types[Math.floor(Math.random() * types.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { value, type };
  };
  var score = 0
  const getScore = () => {
    cards.forEach(card => {
      if (card.value==="J" || card.value==="Q" || card.value==="K"){
        score = score+10
      } else if (card.value==="A"){
          if (score>10){
            score=score+1
          } else{
            score=score+11
          }
      } else{
        score = score+card.value
      }
    });
    console.log(score)
    return score
  } 
  // Génération de deux cartes
  var cards = [getRandomCard(), getRandomCard()];

  const takeCard = () => {
    cards = [ cards, getRandomCard]
    
  }
  return (
    <div className="hand">

      <button onClick={takeCard}>Prendre une carte</button>
      <h2>Your Hand</h2>
      <div className="cards">
        {cards.map((card, index) => (
          <Card key={index} value={card.value} type={card.type} />
        ))}
      </div>
      <div>Votre score : {getScore()}</div>
    </div>
  );
};

export default Hand;