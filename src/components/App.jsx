import React from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import ArticleList from './ArticleList';
import 'materialize-css/dist/css/materialize.min.css';
import SearchResults from './SearchResults';
import PropTypes from 'prop-types';
import * as actions from './../actions';
import { connect } from 'react-redux';
import CoreLogo from '../assets/images/core-logo.png';

class App extends React.Component {

  constructor(props){
    super(props);
  }

  // componentWillMount() {
  //   console.log('COMPONENT WILL MOUNT');
  //   const { dispatch } = this.props;
  //   const { watchFirebaseArticlesRef } = actions;
  //   dispatch(watchFirebaseArticlesRef());
  // }

  render() {
    let colStyle = {
      padding: '50px'
    };
    let logoStyle = {
      textAlign: 'center'
    };
    let imgStyle = {
      width: '10%'
    };
    return(
      <div style={colStyle}>
        <Header/>
        <div className='row'>
          <div style={colStyle} className='col s6'>
            <SearchForm/>
            <SearchResults />
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
  }
}

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(App);