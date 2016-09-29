import firebase, { firebaseRef, githubProvider } from '../firebase/';

export const login = uid => ({
  type: 'LOGIN',
  payload: uid
});

export const logout = () => ({
  type: 'LOGOUT'
});


export const startLogin = () => {
  return (dispatch) => {
    return firebase.auth().signInWithPopup(githubProvider).then((result) => {
      console.log('Auth worked!', result);
      // Store token in localStorage
      const authObj = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL
      };
      dispatch(login(authObj));
    }, (error) => {
      console.log('Unable to auth', error);
    });
  };
};

export const startLogout = () => {
  return (dispatch) => {
    return firebase.auth().signOut().then(() => {
      console.log('Logged Out!');
      dispatch(logout());
    });
  };
};
