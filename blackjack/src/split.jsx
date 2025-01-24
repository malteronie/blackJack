import React from "react";
import Card from "./Card";


const Split = ({ cards, getScore }) => {
  return (
    <div className="bot">
    <div className="hand">
      <h2>Your Hand</h2>
      <div className="cards">
        {cards.map((card) => (
          <div style={{ color: card.type === "♠" || card.type === "♣" ? "black" : "red" }}>
            <Card value={card.value} type={card.type} />
          </div>
        ))}
      </div>
      <div>Votre score : {getScore}</div>
    </div>
    </div>
  );
};

export default Hand;