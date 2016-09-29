import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
});

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return state.mergeDeep(fromJS(action.payload));
    case 'LOGOUT':
      return fromJS({});
    default:
      return state;
  }
};

export default auth;

// Selectors
export const getUid = state => state.get('uid');

export const getDisplayName = state => state.get('displayName');

export const getPhotoUrl = state => state.get('photoURL');
