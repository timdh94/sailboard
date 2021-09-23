const Keyboard = ({ board }) => {
  if (!board) return (
    <div>Error rendering board</div>
  );
  
  // todo: write delete function
  // todo: add - list item - functionality
  
  return (
    <div className='board-container' key={board.id}>
      <div className='details-container'>
        <div className='collection-board'>
          <div className='board-picture'>
            picture here
          </div>
          <div className='board-details'>
            <p><span className='description-header'>name:</span> {board.boardName}</p>
            <p><span className='description-header'>size:</span> {board.boardSize}</p>
            <p><span className='description-header'>manufacturer:</span> {board.manufacturer}</p>
            <p><span className='description-header'>description:</span> {board.description}</p>
          </div>
        </div>
        <input
          type='button'
          id={board.id.toString()}
          className='delete-board'
          onClick={() => {}}
          value='delete'
        />
      </div>
    </div>
  );
};

export default Keyboard;