import React from 'react';

const SignInPage = () => {
  let formStyle = {
    display: 'block',
    marginTop: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%'
  };
  let btnStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  };
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
        <button style={btnStyle} className='waves-effect waves-light btn-small'>Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;