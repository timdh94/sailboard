import './UserListings.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListingService from '../../../services/listingService';
import BidResponse from '../../bids/BidResponse/BidResponse';
import React from 'react';

const UserListings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [userListings, setUserListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
      return;
    }
    (async () => {
      const accessToken = localStorage.getItem('accessToken');
      const res = await ListingService.getUserListings(accessToken);
      if (res.userListings) {
        res.userListings.forEach(listing => {
          listing.Bids.forEach(bid => {
            if (bid.status === 'Pending response') listing.newBid = true;
          });
        });
        res.userListings = res.userListings.filter(listing => listing.newBid);
        setUserListings(res.userListings);
      }
    })();
    setIsLoading(false);
  }, [dispatch, history, isAuthenticated]);

  
  if (isLoading || !userListings) return (<></>);
  return (
    <div className='user-listings-container'>
      {userListings.map(listing => (
        <div key={listing.id} className='user-listing'>
          {listing.newBid && 
            <div className='new-bid-brief-container'>
              <div 
                className='new-bid-listing-image'
                style={{
                  backgroundImage: `url(http://localhost:3005/uploads/${listing.Keyboard.image})`,
                }}
              >
              </div>
              <div className='new-bid-listing-info-container'>
                <p>{listing.Keyboard.boardName}</p>
              </div>
            </div>
          }
          {listing.Bids.map(bid => {
            if (bid.status === 'Pending response') return <BidResponse bid={bid} key={bid.id}/> 
          })}
        </div>
        ))}
        {userListings.length === 0 && <div className='no-new-bids'>No new bids yet, try again later.</div>}
    </div>
  )

};

export default UserListings;
