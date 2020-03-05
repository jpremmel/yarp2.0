import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const CreateAcctPage = (props) => {
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

  if (props.auth.uid) {
    return (
      <Redirect to='/'/>
    );
  } else {
    return (
      <div className='container'>
        <form style={formStyle}>
          <div className='input-field'>
            <input
              type='email'
              placeholder='Email address'
            />
          </div>
          <div className='input-field'>
            <input
              type='password'
              placeholder='Password'
            />
          </div>
          <button style={btnStyle} className='waves-effect waves-light btn-small'><i className='material-icons left'>person_add</i>Create Account</button>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth
});

export default connect(mapStateToProps)(CreateAcctPage);