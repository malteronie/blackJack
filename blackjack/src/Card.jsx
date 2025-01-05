import React from 'react';

const CardList = ({ value, type }) => {
    return (
      <div className="card">
        {value} {type}
      </div>
    );
  };

export default CardList;