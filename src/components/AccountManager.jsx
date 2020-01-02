import React from 'react';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';

const AccountManager = () => {
  let greyStyle = {
    backgroundColor: '#d9d9d9',
    borderRadius: '3px',
    padding: '15px'
  };
  return (
    <div style={greyStyle}>
      Account Manager Here
      <SignedIn/>
      <SignedOut/>
    </div>
  );
};

export default AccountManager;