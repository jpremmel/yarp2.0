import React from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import ArticleList from './ArticleList';
import SearchResults from './SearchResults';
import CoreLogo from '../images/core-logo.png';
import * as actions from './../actions';

const Homepage = () => {
  let colStyle = {
    padding: '50px'
  };
  let logoStyle = {
    textAlign: 'center',
    width: '100%'
  };
  let imgStyle = {
    width: '10%',
    maxWidth: '100px'
  };
  return (
    <div style={colStyle}>
    <Header/>
    <div className='row'>
      <div style={colStyle} className='col s6'>
        <SearchForm/>
        <SearchResults/>
      </div>
      <div style={colStyle} className='col s6'>
        <ArticleList/>
      </div>
    </div>
    <div className='row'>
      <div className='col' style={logoStyle}>
        <a target='_blank' href='https://core.ac.uk/'><img src={CoreLogo} style={imgStyle}/></a>
      </div>
    </div>
  </div>
  );
};

export default Homepage;