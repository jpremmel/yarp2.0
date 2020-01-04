import React from 'react';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';
import CoreLogo from '../images/core-logo.png';
import { connect } from 'react-redux';

const AccountManager = () => {
  let navStyle = {
    backgroundColor: '#f8f9fa'
  };
  let imgStyle = {
    maxHeight: '30px'
  };
  return (
    <nav className='nav-wrapper' style={navStyle}>
      <div className='container'>
        <a target='_blank' href='https://core.ac.uk/' className='brand-logo'><img src={CoreLogo} style={imgStyle}/></a>
        <SignedIn/>
        <SignedOut/>
      </div>
    </nav>
  );
};

export default AccountManager;