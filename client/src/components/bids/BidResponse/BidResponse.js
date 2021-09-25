import './BidResponse.css';
import BidService from '../../../services/BidService';
import React from 'react';
//import  { useSelector, useDispatch } from 'react-redux';

const BidResponse = ({ bid }) => {
  
  const rejectBid = async () => {
    const res = await BidService.rejectBid(bid);
    console.log(res);
  };
  
  return (
    <div className='bid-response-container'>
      <div className='bid-details-container'>
        <div>{bid.status}</div>
        <div>${bid.amount}</div>
        <div>{bid.message}</div>
        <div>location: {bid.bidderLocation}</div>
      </div>
      <div className='bid-response-buttons-container'>
        <input
          type='button'
          value='accept bid'
        />
        <input
          type='button'
          value='reject bid'
          onClick={rejectBid}
        />
      </div>
    </div>
  );
};

export default BidResponse;