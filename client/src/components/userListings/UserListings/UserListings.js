import './UserListings.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListingService from '../../../services/listingService';
import KeyboardListing from '../../browse/KeyboardListing/KeyboardListing';
import BidService from '../../../services/BidService';

const UserListings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [userListings, setUserListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  
  const getListingBids = async (listingId) => {
    const res = await BidService.getListingBids(listingId);
    return res;
  };
  
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login');
      return;
    }
    (async () => {
      const accessToken = localStorage.getItem('accessToken');
      const res = await ListingService.getUserListings(accessToken);
      if (res.userListings) {
        for (const listing of res.userListings) {
          const res = await BidService.getListingBids(listing.id);
          if (res.bids.length > 0) {
            listing.newBids = true;
          }
        }
        setUserListings(res.userListings);
      }
      dispatch({
          type: 'SET_USER_LISTINGS',
          payload: res.userListings
      });
    })();
    
    setIsLoading(false);
  }, [dispatch, history, isAuthenticated]);
  
  
  if (isLoading) return (<></>);
  return (
    <div>
      {userListings.map(listing => (
        <div key={listing.id}>
          <KeyboardListing
          listing={listing}
          />
          {listing.newBids && <div>New bids!! Respond ASAP!</div>}
          <input
            className='unlist-button'
            type='button'
            value='unlist'
          />
        </div>
        ))}
    </div>
  )

};

export default UserListings;
