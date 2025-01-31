import React from "react";
import Card from "./Card";

const Hand = ({ cards, getScore, hit, stay, isStart, setCard, result, setGame, setText}) => {
  return (
    <div className="bot">
    <div className="hand">
    {isStart && <button onClick={() => hit(cards, setCard)} className="button">Hit</button>}
    {isStart && <button onClick={() => stay(cards, setGame, setText)} className="button">Stay</button>}
      <h2>Your Hand</h2>
        {!isStart && <div>{result}</div>}
      <div className="cards">
        {cards.map((card) => (
          <div style={{ color: card.type === "♠" || card.type === "♣" ? "black" : "red" }}>
            <Card  value={card.value} type={card.type} />
          </div>
        ))}
        
      </div>
      <div>Votre score : {getScore}</div>
    </div>
    </div>
  );
};

export default Hand;