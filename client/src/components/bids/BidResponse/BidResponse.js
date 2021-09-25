import './BidResponse.css';
//import  { useSelector, useDispatch } from 'react-redux';

const BidResponse = ({ bid }) => {
  
  return (
    <div className='bid-response-container'>
      <div className='bid-details-container'>
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
        />
      </div>
    </div>
  );
};

export default BidResponse;