import './Keyboard.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CollectionService from '../../../services/collectionService';
import ListingService from '../../../services/listingService';
import { useHistory } from 'react-router-dom';

// TODO: check for keyboards that are already lists for sale --->
// link to listing instead of list for sale button

const Keyboard = ({ board }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isListing, setIsListing] = useState(false);
  const [minBid, setMinBid] = useState(0);
  const [serverRes, setServerRes] = useState('');

  if (!board) return (
    <div>Error rendering board</div>
  );
  
  const deleteBoard = async (e) => {
    const { id } = e.target
    const accessToken = localStorage.getItem('accessToken');
    await CollectionService.deleteKeyboard(id, accessToken);
    // TODO: add res success check before deleting board
    dispatch({
      type: 'DELETE_BOARD',
      payload: parseInt(id)
    });
  };
  
  const updatePrice = (e) => {
    setMinBid(e.target.value);
  };
  
  const createListing = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    const res = await ListingService.createListing({
      minBid,
      boardId: board.id
    }, accessToken);
    if (res.newListing) {
      setIsListing(false);
      return;
    }
    setServerRes(res.message);
  };
  
  const backgroundURL = `http://localhost:3005/uploads/${board.image}`;
  
  return (
    <div className='board-container' key={board.id}>
      <div className='details-container'>
        <div 
          className='collection-board'>
          <div 
            className='board-picture'
            style={{
              backgroundImage: `url(${backgroundURL}`,
            }}>
          </div>
          <div className='board-details'>
            <p><span className='description-header'>name:</span> {board.boardName}</p>
            <p><span className='description-header'>size:</span> {board.boardSize}</p>
            <p><span className='description-header'>manufacturer:</span> {board.manufacturer}</p>
            <p><span className='description-header'>description:</span> {board.description}</p>
            <div className='keyboard-button-container'>
              {board.Listing && 
                <input
                  type='button'
                  className='keyboard-display-button keyboard-display-list-button'
                  value='view listing'
                  onClick={() => {history.push(`/listing/${board.Listing.id}`)}}
                />
              }
              {!isListing && !board.Listing && 
                <input
                  type='button'
                  id={board.id.toString()}
                  className='keyboard-display-button keyboard-display-list-button'
                  onClick={() => {setIsListing(true)}}
                  value='list for sale'
                />
              }
              <input
                type='button'
                id={board.id.toString()}
                className='keyboard-display-button keyboard-display-delete-button'
                onClick={deleteBoard}
                value='delete'
              />
            </div>
          </div>
        </div>
        {isListing && 
          <div className='listing-form'>
            <form className='create-listing-form' onSubmit={createListing}>
              <label htmlFor='minBidPrice'>minumum bid:</label>
              <input
                type='number'
                name='minBidPrice'
                id='minBidPrice'
                value={minBid}
                onChange={updatePrice}
              />
              <input
                type='submit'
                name='postListing'
                id='postListingButton'
                value='create listing'
              />
              <input
                type='button'
                name='cancelListing'
                value='cancel'
                onClick={() => setIsListing(false)}
              />
            </form>
            {serverRes}
          </div>
        }
      </div>
    </div>
  );
};

export default Keyboard;