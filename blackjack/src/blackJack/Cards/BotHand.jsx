import React from "react";
import Card from "./Card";

const BotHand = ({ cards, getScore, isFinished }) => {
  return (
    <div className="hand">
      <h2>Bot Hand</h2>
      <div className="cards">
        {cards.map((card, index) => (
          <div
            key={index}
            style={{ color: card.type === "♠" || card.type === "♣" ? "black" : "red" }}
          >
            {/* Si isFinished est true, on affiche toutes les cartes */}
            <Card value={isFinished ? card.value : index === 0 ? card.value : "?"} 
                  type={isFinished ? card.type : index === 0 ? card.type : "?"} />
          </div>
        ))}
      </div>
      {/* Affichage du score uniquement quand la partie est terminée */}
      <h3>Score : {getScore}</h3>
    </div>
  );
};

export default BotHand;