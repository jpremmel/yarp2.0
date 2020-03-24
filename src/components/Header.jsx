import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearSearchResults } from './../actions';

const Header = () => {
  const dispatch = useDispatch();

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
      text-shadow: 2px 2px #26a69a;
      transform: translateY(-2px);
    }
  `;
  return(
    <div>
      <style>{linkHover}</style>
      <div className='row'>
        <div className='col s6 offset-s3' style={centerColStyle}>
          <NavLink to='/' style={linkStyle} onClick={() => {dispatch(clearSearchResults());}}>
            <h1 id='yarp'>YARP</h1>
          </NavLink>
          <h6>Yepicodus Academic Research Portal</h6>
        </div>
      </div>
    </div>
  );
};

export default Header;