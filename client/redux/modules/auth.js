// Auth is currently broken.
import SC from 'soundcloud';

const ACTIVATE_AUTH = 'ACTIVATE_AUTH';

const initialState = {
  authInProgress: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIVATE_AUTH:
      return {
        ...state,
        authInProgress: true,
      };
    default:
      return state;
  }
}
/* Selectors */
export function isAuthInProgress(state) {
  return state.auth.authInProgress;
}

export function fetchMe(session) {
  fetch(`//api.soundcloud.com/me?oauth_token=${session.oauth_token}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    });
}

export function activateAuth() {
  return {
    type: ACTIVATE_AUTH,
  };
}

export function auth() {
  return (dispatch) => {
    dispatch(activateAuth());
    
    SC.connect().then((session) => {
      console.log(session);
      fetchMe(session);
    });
  };
}



