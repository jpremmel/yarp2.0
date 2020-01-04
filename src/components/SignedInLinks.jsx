import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => {
  let linkStyle = {
    color: 'black'
  };
  return (
    <ul className='right'>
      <li><NavLink to='/' style={linkStyle}>Sign Out</NavLink></li>
    </ul>
  );
};

export default SignedInLinks;