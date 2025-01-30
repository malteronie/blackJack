import React from "react";
import Hand from "./Hand";


const Split = ({ cards, getScore, isFinished, hit, stay, isStart }) => {
  const splitCard1 = []

  return (
    <div className="">
      <Hand cards={cards} getScore={getScore} isFinished={isFinished} hit={hit} stay={stay} isStart={isStart}/>
    </div>
  );
};

export default Split;