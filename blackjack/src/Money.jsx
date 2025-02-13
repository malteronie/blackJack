import React from "react";

const Money = ({montant, mise, lower, increase }) => {
 return (
 <div>
    <img src="/money.jpg" alt="" />
    <p>Montant : {montant}</p><br />
    <div>
        <p>Mise : {mise}</p>
        <button onClick={lower}>-</button>
        <button onClick={increase}>+</button>
    </div>
 </div>
)}

export default Money