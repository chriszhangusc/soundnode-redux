import SC from 'soundcloud';
import { CLIENT_ID, REDIRECT_URI } from 'client/common/constants/authConsts';

export function login() {
  return dispatch => {
    console.log('Login');
    SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });
    SC.connect().then(session => {
      console.log(session);
      // Cookies.set(OAUTH_TOKEN, session.oauth_token);
      // dispatch(setSession(session));
      // dispatch(fetchUser());
    });
  };
}

export function logout() {
  console.log('Logout');
}
