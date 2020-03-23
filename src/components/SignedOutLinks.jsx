import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
  const linkStyle = {
    color: 'black'
  };
  return (
    <span><li><NavLink to='/sign-in' style={linkStyle}>Sign In</NavLink></li>
      <li><NavLink to='/create-acct' style={linkStyle}>Create Account</NavLink></li></span>
  );
};

export default SignedOutLinks;