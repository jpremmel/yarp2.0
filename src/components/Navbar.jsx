import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import CoreLogo from '../images/core-logo.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

const Navbar = (props) => {
  const { auth, profile } = props;
  const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>;

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
        {links}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Navbar);