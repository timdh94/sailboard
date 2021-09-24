import './BrowseAll.css';
import ListingService from '../../../services/listingService';
import KeyboardListing from '../KeyboardListing/KeyboardListing';
import { useEffect, useState } from 'react';

const BrowseAll = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect( () => {
    (async () => {
      const res = await ListingService.getAllListings();
      if (res.listings) {
        setListings(res.listings);
      }
      setIsLoading(false);
    })();
  }, []);

  
  if (isLoading) return (<></>);
  return (
    <div className='browse-container'>
      {listings.map(listing => (
        <KeyboardListing 
          key={listing.id}
          listing={listing}
        />
      ))}
    </div>
  )
};

export default BrowseAll;