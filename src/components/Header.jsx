import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const centerColStyle = {
    textAlign: 'center'
  };
  const linkStyle = {
    display: 'inline-block',
    color: 'black',
    textShadow: '1px 1px #dfe0e1'
  };
  const linkHover = `
    #yarp:hover {
      text-shadow: 1px 1px #26a69a;
    }
  `;
  return(
    <div>
      <style>{linkHover}</style>
      <div className='row'>
        <div className='col s6 offset-s3' style={centerColStyle}>
          <NavLink to='/' style={linkStyle}><h1 id='yarp'>YARP</h1></NavLink>
          <h6>Yepicodus Academic Research Portal</h6>
        </div>
      </div>
    </div>
  );
};

export default Header;