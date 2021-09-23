import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddKeyboard from '../AddItem/AddKeyboard';
import Keyboard from '../Keyboard/Keyboard';
import CollectionService from '../../../services/collectionService';

const Collection = () => {
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();
  const collection = useSelector(state => state.collection);
  
  useEffect(() => {
    (async () => {
      if (collection.length > 0) return;
      const accessToken = localStorage.getItem('accessToken');
      const res = await CollectionService.getCollection(accessToken);
      dispatch({ type: 'SET_BOARDS', payload: res.userCollection });
      console.log(res);
    })();
  }, [dispatch, collection.length]);

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