import constants from './../constants';
const { initialState } = constants;

const authReducer = (state = initialState.authError, action) => {
  switch(action.type) {
    case 'LOGIN_ERROR':
      console.log('Login failed', action.err);
      return 'Login failed';
    case 'LOGIN_SUCCESS':
      console.log('Login success');
      return null;
    case 'SIGNOUT_SUCCESS':
      console.log('Signout success');
      return null;
    case 'SIGNUP_SUCCESS':
      console.log('Signup success');
      return null;
    case 'SIGNUP_ERROR':
      console.log('Signup error', action.err);
      return 'Signup failed';
    default:
      return state;
  }
};

export default authReducer;