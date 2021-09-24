import './UserListings.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ListingService from '../../../services/listingService';
import KeyboardListing from '../../browse/KeyboardListing/KeyboardListing';

const UserListings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userListings = useSelector(state => (state.listings));
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
        dispatch({
          type: 'SET_USER_LISTINGS',
          payload: res.userListings
        });
      }
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
