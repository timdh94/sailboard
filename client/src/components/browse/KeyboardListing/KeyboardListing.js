import './KeyboardListing.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const KeyboardListing = ({ listing }) => {
  const history = useHistory();
  const [backgroundURL] = useState(`http://localhost:3005/uploads/${listing.Keyboard.image})`);
  
  const goToListing = () => {
    history.push(`/listing/${listing.id}`);
  };
  
  if (!listing) return (<div>error loading listing</div>)

  return (
    <div className='keyboard-listing-container' onClick={goToListing}>
      <div className='listing-picture-container'
       style={{
         backgroundImage: `url(${backgroundURL}`,
         }}>
      </div>
      <div className='listing-details'>
        <p className='listing-board-name'>{listing.Keyboard.boardName}</p>
        <p>Location: {listing.itemLocation}</p>
        {(listing.minBid) ? 
          <p>Minimum bid: ${listing.minBid}</p>
        : <></>}
      </div>
    </div>
  )
};

export default KeyboardListing;