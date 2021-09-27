import './FreshItems.css';
import React, { useEffect, useState } from 'react';
import ListingService from '../../../services/listingService';
import KeyboardListing from '../../browse/KeyboardListing/KeyboardListing';

const FreshItems = () => {
  const [listings, setListings] = useState([]);
  // get 5 newest listings
  // display in a row
  useEffect(() => {
    (async () => {
      const res = await ListingService.getAllListings();
      if (res.listings) {
        setListings(res.listings);
      }
    })();
  }, []);


  return (
    <div className='fresh-items-container'>
      <h1 className='fresh-items-title'>new items</h1>
      <div className='fresh-items-list'>
        {listings.map(listing => (
          <KeyboardListing key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default FreshItems;
