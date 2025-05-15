import React from "react";
import '../../App'
import cardBack from '../../card.jpg';


const Card = ({ value, type }) => {
  if (!value || !type) return null; 

  return (
    <div className={`card`} style={{
              backgroundImage: value===" " ? `url(${cardBack})` : '',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
              }}>
      <p className="text">{value} {type}</p>
    </div>
  );
};

export default Card;