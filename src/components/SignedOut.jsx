import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOut = () => {
  return (
    <ul className='right'>
      <li><NavLink to='/sign-in'>Sign In</NavLink></li>
      <li><NavLink to='/create-acct'>Create Account</NavLink></li>
    </ul>
  );
};

export default SignedOut;