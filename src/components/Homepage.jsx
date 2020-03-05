import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SearchForm from './SearchForm';
import ArticleList from './ArticleList';
import SearchResults from './SearchResults';

const Homepage = (props) => {
  let searchCol;
  let myArticlesCol;
  const { auth } = props;
  if (auth.uid) {
    searchCol = <div style={colStyle} className='col s6'><SearchForm/><SearchResults/></div>;
    myArticlesCol = <div style={colStyle} className='col s6'><ArticleList/></div>;
  } else {
    searchCol = <div style={colStyle} className='col s12'><SearchForm/><SearchResults/></div>;
  }
  const colStyle = {
    padding: '50px'
  };
  return (
    <div className='container'>
    <div className='row'>
      {searchCol}
      {myArticlesCol}
    </div>
  </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

export default compose(connect(mapStateToProps))(Homepage);