import './KeyboardListing.css';
import React from 'react';
import { useHistory } from 'react-router-dom';

const KeyboardListing = ({ listing }) => {
  const history = useHistory();
  
  const goToListing = () => {
    history.push(`/listing/${listing.id}`);
  };
  
  //const backgroundURL = `url(http://localhost:3005/uploads/${listing.Keyboard.image})`;
  
  if (!listing) return (<div>error loading listing</div>)

  return (
    <div className='keyboard-listing-container' onClick={goToListing}>
      <div className='listing-picture-container'>
        <img 
          className='listing-picture'
          src={`http://localhost:3005/uploads/${listing.Keyboard.image}`}
        />
      </div>
      <div className='listing-details'>
        <p>Board: {listing.Keyboard.boardName}</p>
        <p>Location: {listing.itemLocation}</p>
        {(listing.minBid) ? 
          <p>Minimum bid: ${listing.minBid}</p>
        : <></>}
      </div>
    </div>
  )
};

export default KeyboardListing;