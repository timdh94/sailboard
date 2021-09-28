import './ListingDetails.css';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ListingService from '../../../services/listingService';
import BidForm from '../BidForm/BidForm';
import { useSelector } from 'react-redux';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [keyboardLoaded, setKeyboardLoaded] = useState(false);
  const [placingBid, setPlacingBid] = useState(false);
  const userInfo = useSelector(state => state.auth.userInfo);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [isUsers, setIsUsers] = useState(true);
  
  useEffect(() => {
    (async () => {
      if (id) {
        const res = await ListingService.getListing(id);
        if (res.listing) {
          setListing(res.listing);
          setKeyboardLoaded(true);
          console.log(res.listing);
          if (userInfo && res.listing.UserId !== userInfo.id) {
            setIsUsers(false);
          }
        }
      }
    })();
  }, [id]);
  
  if (!keyboardLoaded) return(<></>);

  return (
    <div className='listing-details-container'>
      <div className='picture-details-container'>
        <div 
          className='picture-container'
          style={{
            backgroundImage: `url(http://localhost:3005/uploads/${listing.Keyboard.image})`
          }}
        >
        </div>
        <div className='overview-container'>
          <div className='boardName'>
            {listing.Keyboard.boardName}
          </div>
          <div className='listing-details-min-bid'>
            minimum bid: <span>${listing.minBid}</span>
          </div>
          <div className='seller-name'>
            sold by: <span className='listing-detail'>{listing.sellerName}</span>
          </div>
          <div className='manufacturer'>
            maker: <span className='listing-detail'>{listing.Keyboard.manufacturer}</span>
          </div>
          <div className='boardSize'>
            size: <span className='listing-detail'>{listing.Keyboard.boardSize}</span>
          </div>
          <div className='switches'>
            switches: <span className='listing-detail'>{listing.Keyboard.switches}</span>
          </div>
          <div className='item-location'>
            located in: <span className='listing-detail'>{listing.itemLocation}</span>
          </div>
        </div>
      </div>
      <div className='board-description'>
        {listing.Keyboard.description}
      </div>
      {!placingBid && !isUsers && 
        <input
          type='button'
          value='place bid'
          className='listing-details-place-bid-button'
          onClick={() => {setPlacingBid(true)}}
        />
      }
      {!isAuthenticated && 
        <div className='no-auth-bid'>
          <a href='http://localhost:3000/login'>Login to place a bid!</a>
        </div>
      }
      {placingBid && 
        <BidForm 
        setPlacingBid={setPlacingBid}
        minBid={listing.minBid}
        listing={listing}
      />
      }
    </div>
  );
};

export default ListingDetails;