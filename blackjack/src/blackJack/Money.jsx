import React from "react";

const Money = ({ montant, mise, lower, increase, setMise, isStart }) => {
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10) || 1;
    setMise(Math.max(1, Math.min(value, montant)));
  };

  return (
    <div>
      <div>
      <p>Montant : {montant} $</p>
      <div className="mise">
  {!isStart && 
    <>
      <button className="mise-button" onClick={lower} disabled={mise <= 1}>-</button>
      <input
        className="montant"
        style={{width: '90px', textAlign: 'center', MozAppearance:'none', WebkitAppearance:'none'}}
        type="number"
        value={mise}
        onChange={handleInputChange}
        onBlur={handleInputChange}
        min="1"
        max={montant}
        disabled={montant === 0}
      />
      {montant === 0 && <p style={{ color: 'red' }}>Vous n'avez plus d'argent pour miser.</p>}

      <button className="mise-button" onClick={increase} disabled={mise >= montant}>+</button>
    </>
  }

</div>
{isStart && <div className="mise-en-jeu">Mise en jeu : {mise}</div>}
      </div>
    </div>
  );
};

export default Money;