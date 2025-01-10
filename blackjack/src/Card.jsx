import React from 'react';

const CardList = ({ value, type }) => {
    return (
      <div className="card">
        <p className='text'>{value} {type}</p>
      </div>
    );
  };

export default CardList;