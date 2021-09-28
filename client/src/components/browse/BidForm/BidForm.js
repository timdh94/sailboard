import './BidForm.css';
import React, { useState } from 'react';
import BidService from '../../../services/BidService';

const defaultForm = {
  bid: 0,
  message: ''
};

// TODO: get min bid from listing, set min as that value

const BidForm = ({ setPlacingBid, minBid, listing }) => {
  const [form, setForm] = useState(defaultForm);
  const [serverRes, setServerRes] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };
  
  const placeBid = async (e) => {
    e.preventDefault();
    console.log(listing);
    const bidToSend = {
      bid: form.bid,
      message: form.message,
      listing
    };
    const res = await BidService.placeBid(bidToSend);
    if (res.message) {
      setServerRes(res.message);
      setForm(defaultForm);
    }
  };

  return (
    <div className='bid-form-container'>
      <form onSubmit={placeBid} className='bid-form'>
        <label htmlFor='bid'>Bid: $
          <input
            type='number'
            min={minBid}
            step='any'
            name='bid'
            value={form.bid}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='message-input'>message:
          <textarea
            name='message'
            id='message-input'
            rows={5}
            cols={50}
            onChange={handleChange}
            value={form.message}
          />
        </label>
      </form>
      {serverRes}
      <div className='bit-form-button-container'>
        <input
          className='bid-form-submit-button bid-form-button'
          type='submit'
          defaultValue='place bid'
          onClick={placeBid}
        />
        <input
          className='bid-form-cancel-button bid-form-button'
          type='button'
          defaultValue='cancel'
          onClick={() => {setPlacingBid(false)}}
        />
      </div>
    </div>
  )
};

export default BidForm;