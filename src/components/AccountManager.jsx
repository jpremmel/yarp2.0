import React from 'react';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const AccountManager = () => {
  return (
    <nav className='nav-wrapper'>
      <div className='container'>
        <SignedIn/>
        <SignedOut/>
      </div>
    </nav>
  );
};

export default AccountManager;