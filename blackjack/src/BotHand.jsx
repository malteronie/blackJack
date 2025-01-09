import React from "react";
import Card from "./Card";

const BotHand = ({ cards, getScore }) => {
  return (
    <div className="hand">
      <h2>Bot Hand</h2>
      <div className="cards">
        {cards.map((card, index) => (
          <p style={{ color: card.type === "♠" || card.type === "♣" ? "black" : "red" }}>
            <Card value={card.value} type={card.type} />
          </p>
        ))}
      </div>
      <div>Score de l'adversaire: {getScore}</div>
    </div>
  );
};

export default BotHand;