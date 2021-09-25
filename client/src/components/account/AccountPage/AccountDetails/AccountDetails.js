import './AccountDetails.css';
import React from 'react';

const AccountDetails = ({ userInfo }) => {
  if (!userInfo) return (<div>error loading user info</div>);
  return (
    <div className='user-details-container'>
      <div className='profile-picture'>
       profile picture here
      </div>
      <div className='user-details'>
        <div className='user-name'>
          <p className='details-header'>username:</p>
          {userInfo.userName}
        </div>
        <div className='user-email'>
          <p className='details-header'>email:</p>
          {userInfo.email}
        </div>
        <div className='user-region'>
          <p className='details-header'>country:</p>
          {userInfo.country}
        </div>
        <button className='edit-details-button'>edit account</button>
      </div>
    </div>
  );
};

export default AccountDetails;
