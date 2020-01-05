import constants from './../constants';
const { initialState } = constants;

const authReducer = (state = initialState.authError, action) => {
  switch(action.type) {
    case 'LOGIN_ERROR':
      console.log('Login failed');
      return 'Login failed';
    case 'LOGIN_SUCCESS':
      console.log('Login success');
      return null;
    default:
      return state;
  }
};

export default authReducer;