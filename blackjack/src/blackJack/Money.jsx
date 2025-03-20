import React from "react";

const Money = ({ montant, mise, lower, increase, setMise, isStart }) => {
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10) || 1;
    setMise(Math.max(1, Math.min(value, montant))); // S'assure que la mise reste dans les limites
  };

  return (
    <div>
      <div>
      <p>Montant : {montant} $</p>
      <div className="mise">

        {!isStart && <div> <button className="text" onClick={lower} disabled={mise <= 1}>-</button>
   <input
        className="montant"
        style={{width: '90px', textAlign: 'center', mozAppearance:'none', webkitAppearance:'none'}}
          type="number"
          value={mise}
          onChange={handleInputChange}
          onBlur={handleInputChange}
          min="1"
          max={montant}
          disabled={montant === 0} // Désactive si plus d'argent
        />
        <button className="text" onClick={increase} disabled={mise >= montant}>+</button></div>}

        {isStart && <div>Mise en jeu : {mise} </div>}
        </div>
      </div>
    </div>
  );
};

export default Money;