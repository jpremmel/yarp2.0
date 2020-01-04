import React from 'react';

function Header(){
  let centerText = {
    textAlign: 'center'
  };
  return(
    <div style={centerText}>
      <h1>YARP</h1>
      <h5>Yepicodus Academic Research Portal</h5>
    </div>
  );
}


export default Header;