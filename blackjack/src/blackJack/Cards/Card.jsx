import React from "react";

const Card = ({ value, type }) => {
  if (!value || !type) return null; // Évite d'afficher une carte invalide

  return (
    <div className={`card `}>
      <p className="text">{value} {type}</p>
    </div>
  );
};

export default Card;