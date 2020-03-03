export const signIn = (credentials) => {
  return (dispatch, getState/*, { getFirebase }*/) => { //need to figure this part out - pass firebase instance from component upon form submission (like I do when saving an article to firestore from search results list)?
    // const firebase = getFirebase(); //...probably not going to use this then. It's currently throwing an error.

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    })
  };
};