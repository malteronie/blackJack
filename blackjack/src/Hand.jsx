import React from "react";
import Card from "./Card";
import "./App.css";

const Hand = () => {
  const cards = [
    { value: "A", type: "♠" },
    { value: "10", type: "♦" },
  ];

  return (
    <div className="hand">
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