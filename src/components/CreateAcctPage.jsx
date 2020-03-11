import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { signUp } from '../actions/authActions';

const CreateAcctPage = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createAcctError, setCreateAcctError] = useState(props.authError);

  useEffect(() => {
    setCreateAcctError(props.authError);
  }, [props.authError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const { firebase } = props;
      const credentials = {
        email: email,
        password: password
      };
      const signUpData = {
        firebase,
        credentials
      };
      props.signUp(signUpData);
    }
  };

  const formStyle = {
    display: 'block',
    marginTop: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40%'
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
          <button type='submit' style={btnStyle} className='waves-effect waves-light btn-small'><i className='material-icons left'>person_add</i>Create Account</button>
          <div style={errorStyle}>
            { props.authError ? <p><strong>{ props.authError }</strong></p> : null }
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
  signUp: (signUpData) => dispatch(signUp(signUpData))
})

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateAcctPage);