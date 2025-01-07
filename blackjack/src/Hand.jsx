import React from "react";
import Card from "./Card";

const Hand = () => {
  const types = ["♠", "♥", "♦", "♣"];
  const values = [
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A",
  ];

  // Fonction pour tirer une carte au hasard
  const getRandomCard = () => {
    const type = types[Math.floor(Math.random() * types.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { value, type };
  };

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
    </div>
  );
};

export default Hand;