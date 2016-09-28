
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({});

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return state.set('uid', action.payload);
    case 'LOGOUT':
      return fromJS({});
    default:
      return state;
  }
};

export default auth;

// Selectors
export const getUid = state => state.get('uid');
