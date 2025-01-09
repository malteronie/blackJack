import React from 'react';

const CardList = ({ value, type }) => {
    return (
      <div className="card">
        <center>{value} {type}</center>
      </div>
    );
  };

export default CardList;