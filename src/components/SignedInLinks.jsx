import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { signOut } from '../actions/authActions';

const SignedInLinks = (props) => {

  const handleSignOut = () => {
    const { firebase } = props;
    props.signOut(firebase);
  }

  const linkStyle = {
    color: 'black'
  };
  return (
    <li><NavLink to='/' onClick={handleSignOut} style={linkStyle}>Sign Out</NavLink></li>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signOut: (firebase) => dispatch(signOut(firebase))
});

export default compose(
  firebaseConnect(),
  connect(null, mapDispatchToProps)
)(SignedInLinks);