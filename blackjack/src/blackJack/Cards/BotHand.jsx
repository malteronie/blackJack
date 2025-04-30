import React from "react";
import Card from "./Card";

const BotHand = ({ cards, getScore, isFinished }) => {
  return (
    <div className="hand">
      <h2>Dealer's Hand</h2>
      <div className="cards">
        {cards.map((card, index) => (
          <div
            key={index}
            style={{ color: card.type === "♠" || card.type === "♣" ? "black" : "red" }}
          >
            <Card value={isFinished ? card.value : index === 0 ? card.value : "?"} 
                  type={isFinished ? card.type : index === 0 ? card.type : "?"} />
          </div>
        ))}
      </div>
     
      <h3>Score : {getScore}</h3>
    </div>
  );
};

export default BotHand;