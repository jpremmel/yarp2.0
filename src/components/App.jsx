import React from 'react';
import AccountManager from './AccountManager';
import Header from './Header';
import Homepage from './Homepage';
import CreateAcctPage from './CreateAcctPage';
import SignInPage from './SignInPage';
import 'materialize-css/dist/css/materialize.min.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <AccountManager/>
        <Header/>
        <Switch>
          <Route exact path='/' render={() => <Homepage/>}/>
          <Route path='/create-acct' render={() => <CreateAcctPage/>}/>
          <Route path='/sign-in' render={() => <SignInPage/>}/>
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(App);