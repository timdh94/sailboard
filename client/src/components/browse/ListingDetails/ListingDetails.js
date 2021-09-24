import './ListingDetails.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ListingService from '../../../services/listingService';
import BidForm from '../BidForm/BidForm';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [keyboardLoaded, setKeyboardLoaded] = useState(false);
  const [placingBid, setPlacingBid] = useState(false);
  
  useEffect(() => {
    (async () => {
      if (id) {
        const res = await ListingService.getListing(id);
        if (res.listing) {
          setListing(res.listing);
          setKeyboardLoaded(true);
        }
      }
    })();
  }, [id]);
  
  if (!keyboardLoaded) return(<></>);

  return (
    <div className='listing-details-container'>
      <div className='picture-details-container'>
        <div className='picture-container'>
          picture here
        </div>
        <div className='overview-container'>
          <div className='boardName'>
            {listing.Keyboard.boardName}
          </div>
          <div className='manufacturer'>
            maker: {listing.Keyboard.manufacturer}
          </div>
          <div className='boardSize'>
            size: {listing.Keyboard.boardSize}
          </div>
          <div className='switches'>
            switches: {listing.Keyboard.switches}
          </div>
          <div className='item-location'>
            located in: {listing.itemLocation}
          </div>
          <div className='seller-name'>
            listed by: {listing.sellerName}
          </div>
        </div>
      </div>
      <div className='board-description'>
        {listing.Keyboard.description}
      </div>
      <div className='bid-info-container'>
        <div className='min-bid'>
          ${listing.minBid}
        </div>
      </div>
      {!placingBid && 
        <input
          type='button'
          value='place bid'
          onClick={() => {setPlacingBid(true)}}
        />
      }
      {placingBid && 
        <BidForm 
        setPlacingBid={setPlacingBid}
        minBid={listing.minBid}
        listingId={listing.id}
      />
      }
    </div>
  );
};

export default ListingDetails;