import React from 'react';

const CardList = ({ value, type }) => {
    return (
      <div className="card">
        <center><p className='text'>{value} {type}</p></center>
      </div>
    );
  };

export default CardList;