import React from 'react';
import { NavLink } from 'react-router-dom';

function Header(){
  let centerColStyle = {
    textAlign: 'center',
    // display: 'block',
    // marginLeft: 'auto',
    // marginRight: 'auto'
  };
  let linkStyle = {
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
}


export default Header;