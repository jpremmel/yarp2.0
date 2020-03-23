import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import Homepage from './Homepage';
import CreateAcctPage from './CreateAcctPage';
import SignInPage from './SignInPage';
import 'materialize-css/dist/css/materialize.min.css';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    const { auth } = this.props;
    if (auth.isLoaded) {
      return(
        <div>
          <Navbar/>
          <Header/>
          <Switch>
            <Route exact path='/' render={() => <Homepage/>}/>
            <Route path='/create-acct' render={() => <CreateAcctPage/>}/>
            <Route path='/sign-in' render={() => <SignInPage/>}/>
          </Switch>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth
});

export default compose (
  firebaseConnect(),
  connect(mapStateToProps)
)(App);