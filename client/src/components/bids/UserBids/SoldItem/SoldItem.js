import './SoldItem.css';
import React from 'react';

const SoldItem = ({ item, userName }) => {
  const didWin = item.winnerUserName === userName;
  return (
    <div className='sold-item-container'>
      <div 
        className='sold-item-picture'
        style={{
          backgroundImage: `url(http://localhost:3005/uploads/${item.Keyboard.image})`
        }}
      >
      </div>
      {didWin && 
        <div className='sold-item-info'> 
          <p>{item.Keyboard.boardName}</p>
          <p>sold price: ${item.soldPrice}</p>
          <p>the seller will contact you via email</p>
        </div>
      }
      {!didWin && 
        <div className='sold-item-info'>
          <p>sold to: {item.winnerUserName}</p>
          <p>sold price: ${item.soldPrice}</p>
          <p>contact: {item.winnerEmail}</p>
        </div>
      }
    </div>
  );
};

export default SoldItem;
