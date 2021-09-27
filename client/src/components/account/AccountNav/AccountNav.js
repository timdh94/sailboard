import './AccountNav.css';
import React, { useState } from 'react';
import Collection from '../../collection/KeyboardCollection/KeyboardCollection';
import UserListings from '../../userListings/UserListings/UserListings';

const AccountNav = () => {
  const [currentDisplay, setCurrentDisplay] = useState('');
  
  return (
    <div className = 'account-nav-container'>
      <div className='account-nav-buttons-container'>
        <button onClick={() => {setCurrentDisplay('collection')}}>my collection</button>
        <button onClick={() => {setCurrentDisplay('listings')}}>my listings</button>
        <button>my bids</button>
      </div>
      <div className='account-selection-display-container'>
        {currentDisplay === 'collection' && <Collection />}
        {currentDisplay === 'listings' && <UserListings />}
      </div>
    </div>
  );
};

export default AccountNav;
