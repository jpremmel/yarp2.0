import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedIn = () => {
  return (
    <ul className='right'>
      <li><NavLink to='/'>Sign Out</NavLink></li>
    </ul>
  );
};

export default SignedIn;