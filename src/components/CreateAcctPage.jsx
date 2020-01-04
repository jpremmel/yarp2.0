import React from 'react';

const CreateAcctPage = () => {
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
      <button style={btnStyle} className='waves-effect waves-light btn-small'><i className='material-icons left'>person_add</i>Create Account</button>
    </form>
  </div>
  );
};

export default CreateAcctPage;