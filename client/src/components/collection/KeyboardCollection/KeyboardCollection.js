import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddKeyboard from '../AddItem/AddKeyboard';
import Keyboard from '../Keyboard/Keyboard';
import CollectionService from '../../../services/collectionService';

const Collection = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const collection = useSelector(state => state.collection);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {

    (async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        history.push('/login');
        return;
      }
      const res = await CollectionService.getCollection(accessToken);
      dispatch({ type: 'SET_BOARDS', payload: res.userCollection });
    })();
    setIsLoading(false);
  }, [dispatch, collection.length, history, isAuthenticated]);

  if (isLoading) return (<></>);
  return (
    <div>
      <h1>your keyboards</h1>
      {!isAdding &&
        <input
          type='button'
          id='new-item-button'
          className='add-item-button'
          onClick={() => setIsAdding(true)}
          value='add keyboard'
        />
      }
      {isAdding && <AddKeyboard />}
      {collection.map(board => (
        <Keyboard key={board.id} board={board} />
      ))}
    </div>
  )
};

export default Collection;