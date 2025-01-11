import React from "react";
import Card from "./Card";

const BotHand = ({ cards, getScore, isFinished }) => {
  
  return (
    <div className="bot">
    <div className="hand">
      <h2>Bot Hand</h2>
      <div className="cards">
        {cards.map((card) => (
          getScore && <p style={{ color: card.type === "♠" || card.type === "♣" ? "black" : "red" }}>
            {isFinished && <Card value={card.value} type={card.type} />}
            {!isFinished && <Card value={card.type} type={card.value} />}
          </p>
        ))}
      </div>
      <div>Score de l'adversaire: {getScore}</div>
    </div>
    </div>
  );
};

export default BotHand;