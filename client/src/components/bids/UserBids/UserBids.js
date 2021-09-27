import './UserBids.css';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BidService from '../../../services/BidService';
import UserBidStatus from '../UserBidStatus/UserBidStatus';

const UserBids = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userBids = useSelector(state => state.bids);
  
  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        history.push('/login');
        return;
      }
      const res = await BidService.getUserBids(accessToken);
      console.log(res);
      if (res.userBids) {
        dispatch({
          type: 'SET_USER_BIDS',
          payload: res.userBids
        });
      }
      console.log(userBids);
    })();
  }, []);

  return (
    <div>
      {userBids.map(bid => (
        <UserBidStatus bid={bid} key={bid.id}/>
      ))}
    </div>
  )
};

export default UserBids;