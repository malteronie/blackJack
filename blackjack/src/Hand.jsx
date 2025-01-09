import React from "react";
import Card from "./Card";

const Hand = ({ cards, getScore }) => {
  return (
    <div className="bot">
    <div className="hand">
      <h2>Your Hand</h2>
      <div className="cards">
        {cards.map((card) => (
          <p style={{ color: card.type === "♠" || card.type === "♣" ? "black" : "red" }}>
            <Card value={card.value} type={card.type} />
          </p>
        ))}
      </div>
      <div>Votre score : {getScore}</div>
    </div>
    </div>
  );
};

export default Hand;