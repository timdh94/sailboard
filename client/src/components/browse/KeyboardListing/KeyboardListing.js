import './KeyboardListing.css';

const KeyboardListing = ({ listing }) => {
  return (
    <div className='keyboard-listing-container' onClick={() => (console.log(`clicked ${listing.id}`))}>
      <div className='listing-picture'>
        picture here
      </div>
      <div className='listing-details'>
        <p>Board: {listing.Keyboard.boardName}</p>
        <p>Location: {listing.itemLocation}</p>
        {(listing.buyItNowPrice) ? 
          <p>Buy It Now: ${listing.buyItNowPrice}</p>
        : <></>}
      </div>
      <div className='listing-description'>
        <p>{listing.Keyboard.description}</p>
      </div>
    </div>
  )
};

export default KeyboardListing;