import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOut = () => {
  let linkStyle = {
    color: 'black'
  };
  return (
    <ul className='right'>
      <li><NavLink to='/sign-in' style={linkStyle}>Sign In</NavLink></li>
      <li><NavLink to='/create-acct' style={linkStyle}>Create Account</NavLink></li>
    </ul>
  );
};

export default SignedOut;