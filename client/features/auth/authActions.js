import SC from 'soundcloud';
import { CLIENT_ID, REDIRECT_URI } from 'client/common/constants/authConsts';

export function fetchMe(session) {
  fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    });
}

export function login() {
  return (dispatch) => {
    console.log('Login');
    SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI });
    SC.connect().then((session) => {
      dispatch(fetchMe(session));
      // Cookies.set(OAUTH_TOKEN, session.oauth_token);
      // dispatch(setSession(session));
      // dispatch(fetchUser());
    });
  };
}

export function logout() {
  console.log('Logout');
}


