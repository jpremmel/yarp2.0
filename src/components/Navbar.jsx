import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import CoreLogo from '../images/core-logo.png';
import { connect } from 'react-redux';

const Navbar = () => {
  const navStyle = {
    backgroundColor: '#f8f9fa'
  };
  const imgStyle = {
    maxHeight: '30px'
  };
  return (
    <nav className='nav-wrapper' style={navStyle}>
      <div className='container'>
        <a target='_blank' href='https://core.ac.uk/' className='brand-logo'><img src={CoreLogo} style={imgStyle}/></a>
        <SignedInLinks/>
        <SignedOutLinks/>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {

  };
};

export default connect(mapStateToProps)(Navbar);