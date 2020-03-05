
export const signIn = ({ credentials, firebase }) => {
  return (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };
};

export const signOut = (firebase) => {
  return (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' });
    });
  };
};

export const signUp = ({ credentials, firebase }) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    )
      .then((response) => { //add new firebase user to firestore users collection
        return firestore.collection('users').doc(response.user.uid).set({
          email: credentials.email
        })
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      })
  };
};