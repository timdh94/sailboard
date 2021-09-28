import './BidResponse.css';
import BidService from '../../../services/BidService';
import React, { useState } from 'react';

const BidResponse = ({ bid }) => {
  const [currBid, setCurrBid] = useState(bid);

  const rejectBid = async () => {
    const res = await BidService.rejectBid(bid);
    if (res.message) {
      setCurrBid({
        ...bid,
        status: 'Rejected'
      });
    }
  };
  
  const acceptBid = async () => {
    await BidService.acceptBid(bid);
    setCurrBid({
      ...bid,
      status: 'Accepted!'
    });
  }


  return (
    <div className='bid-response-container'>
      <div className='bid-details-container'>
        <div className='bid-details-status'>{currBid.status}</div>
        <div className='bid-details-amount'>${currBid.amount}</div>
        <div>{currBid.message}</div>
        <div>bidder location: <span className='bidder-location'>{currBid.bidderLocation}</span></div>
      </div>
      <div className='bid-response-buttons-container'>
        <input
          type='button'
          value='accept bid'
          className='bid-response-button bid-response-accept'
          onClick={acceptBid}
        />
        <input
          type='button'
          value='reject bid'
          className='bid-response-button bid-response-reject'
          onClick={rejectBid}
        />
      </div>
    </div>
  );
};

export default BidResponse;
