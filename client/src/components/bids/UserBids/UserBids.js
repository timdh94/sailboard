import './UserBids.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ListingService from '../../../services/listingService';
import SoldItem from './SoldItem/SoldItem';

const UserBids = () => {
  const userName = useSelector(state => state.auth.userInfo.userName);
  const [wonItems, setWonItems] = useState([]);
  const [soldItems, setSoldItems]= useState([]);
  
  useEffect(() => {
    (async () => {
      const res = await ListingService.getUserHistory();
      const newWon = [];
      const newSold = [];
      if (res.listingHistory) {
        for (let i = 0; i < res.listingHistory.length; i++) {
          if (res.listingHistory[i].User.userName === userName) {
            newWon.push(res.listingHistory[i]);
          } else {
            newSold.push(res.listingHistory[i]);
          }
        }
        setWonItems(newWon);
        setSoldItems(newSold);
      }
    })();
  }, []);

  return (
    <div className='history-container'>
      <div className='history-title history-title-sold'>sold items</div>
      <div className='won-items-container'>
        {wonItems.map(listing => {
          if (listing.Keyboard) return (
            <div key={listing.id}>
              <SoldItem item={listing} userName={userName}/>
            </div>
          )
        })}
      </div>
      <div className='history-title history-title-won'>won items</div>
      <div className='sold-items-container'>
        {soldItems.map(listing => {
          console.log(soldItems);
          if (listing.Keyboard) return ( 
            <div key={listing.id}>
              <SoldItem item={listing} userName={userName} />
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default UserBids;