import React from 'react';
import SearchForm from './SearchForm';
import ArticleList from './ArticleList';
import SearchResults from './SearchResults';

const Homepage = () => {
  const colStyle = {
    padding: '50px'
  };
  return (
    <div className='container'>
    <div className='row'>
      <div style={colStyle} className='col s6'>
        <SearchForm/>
        <SearchResults/>
      </div>
      <div style={colStyle} className='col s6'>
        <ArticleList/>
      </div>
    </div>
  </div>
  );
};

export default Homepage;