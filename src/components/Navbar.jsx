import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import CoreLogo from '../images/powered-by-core.png';
import GitHubLogo from '../images/github-logo.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

const Navbar = (props) => {
  const { auth, profile } = props;
  const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>;

  const navStyle = {
    backgroundColor: '#f8f9fa'
  };
  const coreImgStyle = {
    maxHeight: '40px',
    marginBottom: '-8px',
    padding: '0 15px'
  };
  const coreHover = `
  #coreLogo {
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    transition-delay: 0s;
  }
  #coreLogo:hover {
  background-color: #dfe0e1;
  }
`;
  const gitHubImgStyle = {
    maxHeight: '40px',
    marginBottom: '-15px',
    hover: 'none'
  };
  return (
    <nav className='nav-wrapper' style={navStyle}>
      <style>{coreHover}</style>
      <div className='container'>
        <a target='_blank' href='https://core.ac.uk/' className='brand-logo' id='coreLogo'><img src={CoreLogo} style={coreImgStyle}/></a>
        <ul className='right'>
          {links}
          <a target='_blank' href='https://github.com/jpremmel/yarp2.0' className='right'><img src={GitHubLogo} style={gitHubImgStyle}/></a>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Navbar);