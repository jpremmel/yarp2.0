import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import CoreLogo from '../images/core-logo.png';
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
    marginBottom: '-5px'
  };
  const gitHubImgStyle = {
    maxHeight: '40px',
    marginBottom: '-15px',
    hover: 'none'
  };
  const noHover = `
    #github:hover {
    background-color: #f8f9fa;
    }
  `;
  return (
    <nav className='nav-wrapper' style={navStyle}>
      <style>{noHover}</style>
      <div className='container'>
        <a target='_blank' href='https://core.ac.uk/' className='brand-logo'><img src={CoreLogo} style={coreImgStyle}/></a>
        <ul className='right'>
          {links}
          <a target='_blank' href='https://github.com/jpremmel/yarp2.0' className='right' id='github'><img src={GitHubLogo} style={gitHubImgStyle}/></a>
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