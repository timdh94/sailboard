import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddKeyboard from '../AddItem/AddKeyboard';
import Keyboard from '../Keyboard/Keyboard';

const Collection = () => {
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();
  const collection = useSelector(state => state.collection);
  
  useEffect(() => {
    if (collection.length === 0 || !collection) {
      // send collection get request to server
    }

  }, [collection]);

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