import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const centerColStyle = {
    textAlign: 'center'
  };
  const linkStyle = {
    color: 'black'
  };
  return(
    <div>
      <div className='row'>
        <div className='col s6 offset-s3' style={centerColStyle}>
          <NavLink to='/' style={linkStyle}><h1>YARP</h1></NavLink>
          <h5>Yepicodus Academic Research Portal</h5>
        </div>
      </div>
    </div>
  );
};

export default Header;