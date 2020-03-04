import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signIn } from '../actions/authActions';

const SignInPage = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState(props.authError);

  useEffect(() => {
    setSignInError(props.authError);
  }, [props.authError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting email: ', email);
    console.log('Submitting password: ', password);
    const { firebase } = props;
    const credentials = {
      email: email,
      password: password
    };
    const authData = {
      firebase,
      credentials
    };
    props.signIn(authData);
  };

  // const { authError } = props;

  const formStyle = {
    display: 'block',
    marginTop: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%'
  };
  const btnStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  };
  const errorStyle = {
    color: 'red',
    textAlign: 'center'
  };

  if (props.auth.uid) {
    return (
      <Redirect to='/'/>
    );
  } else {
    return (
      <div className='container'>
        <form style={formStyle} onSubmit={handleSubmit}>
          <div className='input-field'>
            <input
              type='email'
              placeholder='Email address'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='input-field'>
            <input
              type='password'
              placeholder='Password'
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' style={btnStyle} className='waves-effect waves-light btn-small'><i className='material-icons left'>person</i>Sign In</button>
          <div style={errorStyle}>
            { props.authError ? <p><strong>{props.authError}</strong></p> : null }
          </div>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  authError: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (authData) => dispatch(signIn(authData))
});

//firebaseConnect provides Firebase object with auth method
export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(SignInPage);