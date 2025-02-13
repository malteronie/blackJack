import React from "react";

const Money = ({montant, mise, lower, increase }) => {
 return (
 <div>
    <img src="/money.jpg" alt="" />
    <p>Montant : {montant}</p><br />
    <div className="miseDiv">
        <button onClick={lower} className="mise">-</button>
        <input type="number" className="mise" value={mise} name="mise"/>
        <button onClick={increase} className="mise">+</button>
    </div>
 </div>
)}

export default Money