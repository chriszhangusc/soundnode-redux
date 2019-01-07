import { createReducer } from '@soundnode-redux/client/src/common/utils/reducerUtils';
import * as types from './authActionTypes';

/* Reducer */
const initialState = {
  me: null,
  loginInProgress: false,
  session: null,
  favorites: [],
  reposts: [],
};

// #TODO: Should we extract fetchOffset?
// export default createReducer(initialState, {});

export function updateMe(state, { me }) {
  return {
    ...state,
    me: {
      ...me,
    },
  };
}

export function startLogin(state) {
  return {
    ...state,
    loginInProgress: true,
  };
}

export function stopLogin(state) {
  return {
    ...state,
    loginInProgress: false,
  };
}

export function logout() {
  return {
    ...initialState,
  };
}

export function updateFavorites(state, { favorites }) {
  return {
    ...state,
    favorites: [...favorites],
  };
}

export function addToFavorites(state, { trackId }) {
  if (state.favorites.includes(trackId)) {
    return state;
  }
  return {
    ...state,
    favorites: [...state.favorites, trackId],
  };
}

export function removeFromFavorites(state, { trackId }) {
  return {
    ...state,
    favorites: state.favorites.filter(x => x !== trackId),
  };
}

export function addToReposts(state, { trackId }) {
  if (state.reposts.includes(trackId)) {
    return state;
  }
  return {
    ...state,
    reposts: [...state.reposts, trackId],
  };
}

export function removeFromReposts(state, { trackId }) {
  return {
    ...state,
    reposts: state.reposts.filter(x => x !== trackId),
  };
}

export function updateReposts(state, { reposts }) {
  return {
    ...state,
    reposts: [...reposts],
  };
}

export function resetState() {
  return {
    ...initialState,
  };
}

export default createReducer(initialState, {
  [types.AUTH_USER_UPDATE]: updateMe,
  [types.AUTH_USER_LOGIN_START]: startLogin,
  [types.AUTH_USER_LOGIN_SUCCEEDED]: stopLogin,
  [types.AUTH_USER_LOGIN_STOP]: stopLogin,
  [types.AUTH_FAVORITES_UPDATE]: updateFavorites,
  [types.AUTH_FAVORITES_ADD]: addToFavorites,
  [types.AUTH_FAVORITES_REMOVE]: removeFromFavorites,
  [types.AUTH_REPOSTS_ADD]: addToReposts,
  [types.AUTH_REPOSTS_REMOVE]: removeFromReposts,
  [types.AUTH_REPOSTS_UPDATE]: updateReposts,
  [types.AUTH_USER_LOGOUT_SUCCEEDED]: resetState,
  [types.AUTH_USER_LOGIN_FAILED]: resetState,
});
